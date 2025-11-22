from fastapi import APIRouter
from app.mocks.insurer import (
    COMPANIES,
    COMPANY_INCIDENTS,
    INCIDENT_CARDS
)

router = APIRouter()


@router.get("/company/incidents/list")
def list_companies():
    """
    Страница портфеля страховщика.
    Возвращает 10 компаний и количество их инцидентов с ZK Proof.
    """
    return COMPANIES


@router.get("/company/{company_id}/incidents")
def get_incidents_by_company(company_id: str):
    """
    Список инцидентов конкретной компании.
    """
    return COMPANY_INCIDENTS.get(
        company_id,
        []
    )


@router.get("/company/{company_id}/incident/{incident_id}")
def get_insurer_incident(company_id: str, incident_id: int):
    """
    Детальная карточка киберинцидента для страховщика.
    Показывает commitment off-chain/on-chain, proof, public inputs.
    """
    return INCIDENT_CARDS.get(
        incident_id,
        {"error": "Incident not found"}
    )


@router.post("/company/{company_id}/incident/{incident_id}/verify")
def verify_incident(company_id: str, incident_id: int):
    """
    Нажатие кнопки “Verify Incident”.
    В MVP — мок, возвращаем успешную транзакцию.
    """
    return {
        "incident_id": incident_id,
        "verified": True,
        "txHash": "0xdeadbeefcafecafe11223344ddeeff",
        "message": "Proof verified successfully"
    }
