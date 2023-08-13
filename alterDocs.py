import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Reference to the collection you want to update
collection_ref = db.collection("trends")

# Get all documents in the collection
docs = collection_ref.stream()

# Create a batch object
batch = db.batch()

# Update each document with the new field
for doc in docs:
    doc_ref = collection_ref.document(doc.id)
    batch.update(doc_ref, {"trendName": "change"})

# Commit the batch
batch.commit()

print("New field for trend-name added to all documents in collection.")