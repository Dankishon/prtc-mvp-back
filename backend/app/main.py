from fastapi import FastAPI
from datetime import datetime

from app.db import Base, engine, SessionLocal
from app.models import Company, Incident
from app.routers.incidents import router as incidents_router
from app.routers.insurer import router as insurer_router

app = FastAPI(
    title="Protectorium MVP Backend",
)

# ----------------------------------------------------------------------
# Startup: создаём таблицы и сидируем базу, если пустая
# ----------------------------------------------------------------------
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # -------------------------------
        # 1. Компании (если пусто)
        # -------------------------------
        if db.query(Company).count() == 0:
            companies = [
                Company(id="techflow",    name="TechFlow Analytics",     wallet_address=None),
                Company(id="cloudsync",   name="CloudSync Ltd.",         wallet_address=None),
                Company(id="rideshare",   name="RideShare Mobility",     wallet_address=None),
                Company(id="contenthub",  name="ContentHub Media",       wallet_address=None),
                Company(id="webspace",    name="WebSpace Hosting",       wallet_address=None),
            ]
            db.add_all(companies)
            db.commit()

        # -------------------------------
        # 2. Инциденты (если пусто)
        # -------------------------------
        if db.query(Incident).count() == 0:
            now = datetime.utcnow()
            counter = 1

            def next_incident_id():
                nonlocal counter
                iid = f"20251123-{counter:04d}"
                counter += 1
                return iid

            incidents = [
                # TechFlow — 4
                Incident(
                    incident_id=next_incident_id(),
                    company_id="techflow",
                    detected_at=now,
                    commitment="0xabc1230001",
                    proof_status="need_proof",
                    transaction_hash=None,
                    blockchain_status="none",
                    proof_hash=None,
                    public_inputs=None,
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="techflow",
                    detected_at=now,
                    commitment="0xabc1230002",
                    proof_status="generating",
                    transaction_hash=None,
                    blockchain_status="pending",
                    proof_hash=None,
                    public_inputs=None,
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="techflow",
                    detected_at=now,
                    commitment="0xabc1230003",
                    proof_status="verified",
                    transaction_hash="0xtxhash0003",
                    blockchain_status="confirmed",
                    proof_hash="0xproofhash0003",
                    public_inputs=["0x01", "0x02"],
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="techflow",
                    detected_at=now,
                    commitment="0xabc1230004",
                    proof_status="not_verified",
                    transaction_hash="0xtxhash0004",
                    blockchain_status="pending",
                    proof_hash="0xproofhash0004",
                    public_inputs=["0x01", "0x02"],
                ),

                # CloudSync — 2
                Incident(
                    incident_id=next_incident_id(),
                    company_id="cloudsync",
                    detected_at=now,
                    commitment="0xabc1230010",
                    proof_status="need_proof",
                    transaction_hash=None,
                    blockchain_status="none",
                    proof_hash=None,
                    public_inputs=None,
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="cloudsync",
                    detected_at=now,
                    commitment="0xabc1230011",
                    proof_status="verified",
                    transaction_hash="0xtxhash0011",
                    blockchain_status="confirmed",
                    proof_hash="0xproofhash0011",
                    public_inputs=["0x01", "0x02"],
                ),

                # ContentHub — 3
                Incident(
                    incident_id=next_incident_id(),
                    company_id="contenthub",
                    detected_at=now,
                    commitment="0xabc1230020",
                    proof_status="need_proof",
                    transaction_hash=None,
                    blockchain_status="none",
                    proof_hash=None,
                    public_inputs=None,
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="contenthub",
                    detected_at=now,
                    commitment="0xabc1230021",
                    proof_status="not_verified",
                    transaction_hash="0xtxhash0021",
                    blockchain_status="pending",
                    proof_hash="0xproofhash0021",
                    public_inputs=["0x01", "0x02"],
                ),
                Incident(
                    incident_id=next_incident_id(),
                    company_id="contenthub",
                    detected_at=now,
                    commitment="0xabc1230022",
                    proof_status="verified",
                    transaction_hash="0xtxhash0022",
                    blockchain_status="confirmed",
                    proof_hash="0xproofhash0022",
                    public_inputs=["0x01", "0x02"],
                ),

                # WebSpace — 1
                Incident(
                    incident_id=next_incident_id(),
                    company_id="webspace",
                    detected_at=now,
                    commitment="0xabc1230030",
                    proof_status="need_proof",
                    transaction_hash=None,
                    blockchain_status="none",
                    proof_hash=None,
                    public_inputs=None,
                ),
            ]

            db.add_all(incidents)
            db.commit()

    finally:
        db.close()


# ----------------------------------------------------------------------
# Routers
# ----------------------------------------------------------------------
app.include_router(incidents_router)
app.include_router(insurer_router)
