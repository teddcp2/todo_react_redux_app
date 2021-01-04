
"""Item model"""
from datetime import date
from todo_app import db


class Item(db.Model):
    """Data model for user accounts."""

    __tablename__ = 'todo-items'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.Text,
        index=True,
        unique=True,
        nullable=False
    )

    category = db.Column(
        db.Integer,
        db.ForeignKey('buckets.id'),
        nullable=False
    )

    created_date = db.Column(
        db.DateTime,
        index=False,
        unique=False,
        nullable=False,
        default=date.today
    )

    mark_complete = db.Column(
        db.String(3),
        index=False,
        unique=False,
        nullable=False,
        default="NO"
    )

    deleted = db.Column(
        db.String(3),
        index=False,
        unique=False,
        nullable=False,
        default="NO"
    )

    def __repr__(self):
        return '<Item {}>'.format(self.name)
