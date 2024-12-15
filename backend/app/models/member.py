"""Member model module."""

from datetime import datetime

from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.models.base import table_registry


@table_registry.mapped_as_dataclass
class Member:
    """Member model."""

    __tablename__ = "member"

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    id_user_fk: Mapped[int] = mapped_column(ForeignKey("user.id"))
    created_at: Mapped[datetime] = mapped_column(
        init=False, server_default=now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=now(), onupdate=now()
    )

    user: Mapped["User"] = relationship("User", back_populates="members")

    incomes: Mapped[list["Income"]] = relationship(
        "Income",
        back_populates="member",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    essential_expenses: Mapped[list["EssentialExpense"]] = relationship(
        "EssentialExpense",
        back_populates="member",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    non_essential_expenses: Mapped[list["NonEssentialExpense"]] = relationship(
        "NonEssentialExpense",
        back_populates="member",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )
