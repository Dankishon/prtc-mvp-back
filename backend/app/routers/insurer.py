from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Incident, Company


router = APIRouter(prefix="", tags=["Insurer"])


# ------------------------------------------------------
# dependency
# ------------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------------------------------------------
# 1. Company list (portfolio)
# ------------------------------------------------------

@router.get("/company/incidents/list")
def list_portfolio(db: Session = Depends(get_db)):
    companies = db.query(Company).all()

    response = []

    for c in companies:
        incident_count = db.query(Incident).filter(
            Incident.company_id == c.id
        ).count()

        response.append({
            "company_id": c.id,
            "company_name": c.name,
            "incident_count": incident_count
        })

    return response


# ------------------------------------------------------
# 2. Incidents of company
# ------------------------------------------------------

@router.get("/company/{companyId}/incidents")
def incidents_by_company(companyId: str, db: Session = Depends(get_db)):

    company = db.query(Company).filter(Company.id == companyId).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    incidents = db.query(Incident).filter(
        Incident.company_id == companyId
    ).all()

    return [
        {
            "incident_id": i.incident_id,
            "detected_at": i.detected_at,
            "proof_status": i.proof_status,
        }
        for i in incidents
    ]


# ------------------------------------------------------
# 3. Incident details
# ------------------------------------------------------

@router.get("/company/{companyId}/incident/{incidentId}")
def insurer_incident_details(companyId: str, incidentId: str, db: Session = Depends(get_db)):

    company = db.query(Company).filter(Company.id == companyId).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    inc = db.query(Incident).filter(
        Incident.company_id == companyId,
        Incident.incident_id == incidentId
    ).first()

    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    proof_summary = None
    if inc.proof_status in ["not_verified", "verified"]:
        proof_summary = {
            "proof_hash": inc.proof_hash,
            "public_inputs": inc.public_inputs,
            "commitment": inc.commitment,
            "transaction_hash": inc.transaction_hash
        }

    return {
        "incident_id": inc.incident_id,
        "company_id": companyId,
        "company_name": company.name,
        "detected_at": inc.detected_at,
        "commitment": inc.commitment,
        "proof_status": inc.proof_status,
        "transaction_hash": inc.transaction_hash,
        "blockchain_status": inc.blockchain_status,
        "proof_summary": proof_summary
    }


# ------------------------------------------------------
# 4. Verify proof
# ------------------------------------------------------

@router.post("/company/{companyId}/incident/{incidentId}/verify")
def verify_proof(companyId: str, incidentId: str, db: Session = Depends(get_db)):

    inc = db.query(Incident).filter(
        Incident.company_id == companyId,
        Incident.incident_id == incidentId
    ).first()

    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    inc.proof_status = "verified"
    inc.blockchain_status = "confirmed"

    db.commit()

    return {
        "incident_id": inc.incident_id,
        "proof_status": inc.proof_status
    }
