"""User model module."""

from datetime import datetime

from sqlalchemy import String
from sqlalchemy.sql.functions import now
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import table_registry


@table_registry.mapped_as_dataclass
class User:
    """User model."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    username: Mapped[str] = mapped_column(String(50), unique=True)
    email: Mapped[str] = mapped_column(String(50), unique=True)
    password: Mapped[str] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=now(), onupdate=now()
    )
