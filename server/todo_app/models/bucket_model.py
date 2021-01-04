
"""Bucket model"""
from todo_app import db


class Bucket(db.Model):
    """Data model for user accounts."""

    __tablename__ = 'buckets'

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

    items = db.relationship('Item',
                            backref=db.backref('bucket', lazy='joined'),
                            lazy=True)

    # def __repr__(self):
    #     return '<bucket-{}> '.format(self.name)
