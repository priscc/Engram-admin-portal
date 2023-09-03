# import firebase_admin
# from firebase_admin import credentials, firestore

# # Initialize Firebase Admin SDK
# cred = credentials.Certificate("credentials.json")
# firebase_admin.initialize_app(cred)

# # Initialize Firestore
# db = firestore.client()

# # Reference to the collection you want to update
# collection_ref = db.collection("trends")

# # Get all documents in the collection
# docs = collection_ref.stream()

# # Create a batch object
# batch = db.batch()

# # Update each document with the new field
# for doc in docs:
#     doc_ref = collection_ref.document(doc.id)
#     batch.update(doc_ref, {"trendName": "change"})

# # Commit the batch
# batch.commit()

# print("New field for trend-name added to all documents in collection.")



import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Reference to the collection and document ID of the specific document you want to update
collection_ref = db.collection("trends")
document_id = "your_document_id_here"  # Replace with the actual document ID

# Create a dictionary with the data you want to update
update_data = {
    "created": {
        "name": "your_name_value",
        "username": "your_user_value",
        "timestamp_created": firestore.SERVER_TIMESTAMP
    },
    "updated": {
        "name": "your_name_value",
        "username": "your_user_value",
        "timestamp_updated": firestore.SERVER_TIMESTAMP
    }
}

# Update the specific document with the new fields
doc_ref = collection_ref.document('XJPRbcGQSv5GZ9s8x86Q')
doc_ref.update(update_data)

print("New fields added to the specified document.")