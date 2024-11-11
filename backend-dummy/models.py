# Item Model
item_special_categories = db.Table(
        'item_special_categories',
        db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True),
        db.Column('special_category_id', db.Integer, db.ForeignKey('special_categories.id'), primary_key=True)
    )

class Item:
    __tablename__ = 'items'
    
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String, nullable=False, unique=True)
    item_features = db.Column(db.String, nullable=False)
    item_price = db.Column(db.Integer, nullable=False)
    item_prev_price = db.Column(db.Integer)
    item_image_url = db.Column(db.Text, nullable=False)
    item_category = db.Column(db.String, nullable=False)
    items_in_stock = db.Column(db.Integer, nullable=False)
    
    # Many-to-many relationship with SpecialCategory
    special_categories = db.relationship(
        'SpecialCategory',
        secondary=item_special_categories,
        backref=db.backref('items', lazy=True)
    )
    
    # Check if the item is in stock
    def is_in_stock(self):
        return self.items_in_stock > 0

# SpecialCategory Model
class SpecialCategory(db.Model):
    __tablename__ = "special_categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)