from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    JSON,
)
from sqlalchemy.orm import relationship

from app.db import Base


class Company(Base):
    __tablename__ = "companies"

    # Internal company ID (PK)
    id = Column(String, primary_key=True, index=True)

    # Human-readable name
    name = Column(String, nullable=False)

    # Optional blockchain wallet
    wallet_address = Column(String, nullable=True)

    # Relationship to incidents
    incidents = relationship("Incident", back_populates="company")


class Incident(Base):
    __tablename__ = "incidents"

    # Internal numeric PK
    id = Column(Integer, primary_key=True, index=True)

    # External incident ID, visible to frontend (e.g., "20251123-0001")
    incident_id = Column(String, unique=True, index=True, nullable=False)

    # Company reference
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="incidents")

    # Detection timestamp
    detected_at = Column(DateTime, default=datetime.utcnow)

    # Off-chain cryptographic commitment
    commitment = Column(String, nullable=True)

    # Proof status:
    # need_proof | generating | not_verified | verified
    proof_status = Column(String, nullable=False, default="need_proof")

    # On-chain transaction hash
    transaction_hash = Column(String, nullable=True)

    # Blockchain status:
    # none | pending | confirmed
    blockchain_status = Column(String, nullable=False, default="none")

    # Proof summary fields
    proof_hash = Column(String, nullable=True)

    # Public inputs (JSON array of hex strings)
    public_inputs = Column(JSON, nullable=True)

    # -------------------------
    # NEW FIELDS
    # -------------------------

    # Version of the agent installed on the client's system
    agent_version = Column(String, nullable=True)

    # Severity of the incident:
    # low | medium | high | critical
    severity = Column(String, nullable=True)

    # Number of correlated events / alerts involved
    event_count = Column(Integer, nullable=True)
