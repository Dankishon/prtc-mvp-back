from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Incident, Company

router = APIRouter(prefix="/company", tags=["Insurer"])


# --------------------------------------------------------------------
# Dependency: DB session
# --------------------------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------------------------
# 1. LIST COMPANIES WITH INCIDENT COUNTS (GET /company/incidents/list)
# --------------------------------------------------------------------
@router.get("/incidents/list", summary="List companies with incident count (excluding need_proof status)")
def list_company_incidents(db: Session = Depends(get_db)):
    companies = db.query(Company).all()

    result = []
    for c in companies:
        # Count only incidents with status "not_verified" (Proof Not Verified) 
        # or "verified" (ZK proof Verified), excluding "need_proof" (Need Proof)
        count = (
            db.query(Incident)
            .filter(Incident.company_id == c.id)
            .filter(Incident.proof_status.in_(["not_verified", "verified"]))
            .count()
        )

        result.append({
            "company_id": c.id,
            "company_name": c.name,
            "wallet_address": c.wallet_address,
            "incident_count": count,
        })

    return result


# --------------------------------------------------------------------
# 2. COMPANY INCIDENT TABLE (GET /company/{companyId}/incidents)
# --------------------------------------------------------------------
@router.get("/{companyId}/incidents", summary="List incidents for a company")
def company_incidents(companyId: str, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.id == companyId).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    incidents = (
        db.query(Incident)
        .filter(Incident.company_id == companyId)
        .all()
    )

    return [
        {
            "incident_id": i.incident_id,
            "detected_at": i.detected_at,
            "proof_status": i.proof_status,
            "blockchain_status": i.blockchain_status,

            # New fields
            "severity": i.severity,
            "event_count": i.event_count,
            "agent_version": i.agent_version,
        }
        for i in incidents
    ]


# --------------------------------------------------------------------
# 3. COMPANY INCIDENT DETAILS (GET /company/{companyId}/incident/{incidentId})
# --------------------------------------------------------------------
@router.get("/{companyId}/incident/{incidentId}", summary="Get incident details for insurer")
def company_incident_details(companyId: str, incidentId: str, db: Session = Depends(get_db)):
    incident = (
        db.query(Incident)
        .filter(Incident.company_id == companyId)
        .filter(Incident.incident_id == incidentId)
        .first()
    )

    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    company = db.query(Company).filter(Company.id == companyId).first()

    proof_summary = None
    if incident.proof_status in ["not_verified", "verified"]:
        proof_summary = {
            "proof_hash": incident.proof_hash,
            "public_inputs": incident.public_inputs,
            "commitment": incident.commitment,
            "transaction_hash": incident.transaction_hash,
        }

    return {
        "incident_id": incident.incident_id,
        "company_id": incident.company_id,
        "company_name": company.name if company else None,
        "detected_at": incident.detected_at,
        "commitment": incident.commitment,
        "proof_status": incident.proof_status,
        "transaction_hash": incident.transaction_hash,
        "blockchain_status": incident.blockchain_status,

        # NEW FIELDS
        "severity": incident.severity,
        "event_count": incident.event_count,
        "agent_version": incident.agent_version,

        "proof_summary": proof_summary,
    }


# --------------------------------------------------------------------
# 4. VERIFY (POST /company/{companyId}/incident/{incidentId}/verify)
# --------------------------------------------------------------------
@router.post("/{companyId}/incident/{incidentId}/verify", summary="Verify ZK proof for an incident")
def verify_incident(companyId: str, incidentId: str, db: Session = Depends(get_db)):
    incident = (
        db.query(Incident)
        .filter(Incident.company_id == companyId)
        .filter(Incident.incident_id == incidentId)
        .first()
    )

    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    incident.proof_status = "verified"
    incident.blockchain_status = "confirmed"
    incident.transaction_hash = f"0xtx_verify_{incidentId[-4:]}"

    db.commit()

    return {"status": "ZK proof Verified"}
