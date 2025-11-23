from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models import Incident, Company


router = APIRouter(prefix="", tags=["Policyholder"])


# ------------------------------------------------------
# Dependency
# ------------------------------------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------------------------------------------
# 1. LIST INCIDENTS (GET /incidents)
# ------------------------------------------------------

@router.get("/incidents")
def list_incidents(db: Session = Depends(get_db)):
    incidents = db.query(Incident).all()

    return [
        {
            "incident_id": i.incident_id,
            "detected_at": i.detected_at,
            "proof_status": i.proof_status,
        }
        for i in incidents
    ]


# ------------------------------------------------------
# 2. INCIDENT DETAILS (GET /incident/{id})
# ------------------------------------------------------

@router.get("/incident/{incidentId}")
def incident_details(incidentId: str, db: Session = Depends(get_db)):
    inc = db.query(Incident).filter(Incident.incident_id == incidentId).first()

    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    company = db.query(Company).filter(Company.id == inc.company_id).first()

    proof_summary = None
    if inc.proof_status in ["not_verified", "verified"]:
        proof_summary = {
            "proof_hash": inc.proof_hash,
            "public_inputs": inc.public_inputs,
            "commitment": inc.commitment,
            "transaction_hash": inc.transaction_hash,
        }

    return {
        "incident_id": inc.incident_id,
        "company_id": inc.company_id,
        "company_name": company.name if company else None,
        "detected_at": inc.detected_at,
        "commitment": inc.commitment,
        "proof_status": inc.proof_status,
        "transaction_hash": inc.transaction_hash,
        "blockchain_status": inc.blockchain_status,
        "proof_summary": proof_summary,
    }


# ------------------------------------------------------
# 3. GENERATE PROOF (POST /incident/{id}/generate-proof)
# ------------------------------------------------------

@router.post("/incident/{incidentId}/generate-proof")
def generate_proof(incidentId: str, db: Session = Depends(get_db)):
    inc = db.query(Incident).filter(Incident.incident_id == incidentId).first()

    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    inc.proof_status = "not_verified"
    inc.proof_hash = f"0xproof_{incidentId[-4:]}"
    inc.public_inputs = ["0x01", "0x02"]
    inc.transaction_hash = f"0xtx_{incidentId[-4:]}"
    inc.blockchain_status = "pending"

    db.commit()

    return {
        "incident_id": inc.incident_id,
        "proof_status": inc.proof_status,
    }
