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

    # Внутренний ID компании (PK)
    id = Column(String, primary_key=True, index=True)
    # Человекочитаемое имя компании
    name = Column(String, nullable=False)
    # На будущее (можно не использовать в MVP)
    wallet_address = Column(String, nullable=True)

    # Связь с инцидентами
    incidents = relationship("Incident", back_populates="company")


class Incident(Base):
    __tablename__ = "incidents"

    # Внутренний числовой PK
    id = Column(Integer, primary_key=True, index=True)

    # Внешний ID инцидента, который видит фронт (например "20251123-0001")
    incident_id = Column(String, unique=True, index=True, nullable=False)

    # Компания, к которой относится инцидент
    company_id = Column(String, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="incidents")

    # Время детекции инцидента
    detected_at = Column(DateTime, default=datetime.utcnow)

    # Коммитмент (off-chain хэш)
    commitment = Column(String, nullable=True)

    # Статус пруфа:
    # need_proof | generating | not_verified | verified
    proof_status = Column(String, nullable=False, default="need_proof")

    # Хэш транзакции в блокчейне (если есть)
    transaction_hash = Column(String, nullable=True)

    # Статус на блокчейне:
    # none | pending | confirmed
    blockchain_status = Column(String, nullable=False, default="none")

    # Элементы proof summary (храним по отдельности)
    proof_hash = Column(String, nullable=True)
    # public_inputs как JSON-массив строк
    public_inputs = Column(JSON, nullable=True)
