<template>
	<v-container style="min-height: 100vh;">
		<v-row class="d-flex justify-end">
			<v-col cols="6">
				<v-alert
					v-model="alert"
					dismissible
					text
					outlined
					dense
					color="success"
					icon="mdi-checkbox-marked-circle"
					border="left"
				>
					<p><b>Success:</b> {{ alertMessage }}</p>
				</v-alert>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<Header
					v-bind:header="'Hello!!'"
					v-bind:description="
						'Buttons below are simplied actions you can take to update Engram`s database'
					"
				/>
			</v-col>
		</v-row>
		<v-row class="pt-16">
			<v-col cols="12">
				<v-btn
					@click="updatingSearch()"
					lg
					dark
					outlined
					large
					color="purple"
					>Update Search Bar Autofill options
				</v-btn>
			</v-col>
			<v-col cols="12">
				<v-btn lg dark outlined large color="purple">
					Export database
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Header from "@/components/DashboardHeaders.vue";
import { db } from "../firebase/db.js";

export default {
	components: { Header },
	data() {
		return {
			topicSearchItems: [],
			eventSearchItems1: [],
			eventSearchItems2: [],
			peopleSearchItems: [],
			workSearchItems: [],
			termSearchItems: [],
			alert: false,
			alertMessage: "",
			testTopic: {},
		};
	},
	methods: {
		async updatingSearch() {
			console.log("grabbing autofill search items");
			await this.grabbingDBcontent().then(() => {
				db.collection("searchBar")
					.doc("topicSearchBarOptions")
					.set({ searchItems: this.topicSearchItems }, { merge: true });
				db.collection("searchBar")
					.doc("eventSearchBarOptions1")
					.set({ searchItems: this.eventSearchItems1 }, { merge: true });
				db.collection("searchBar")
					.doc("eventSearchBarOptions2")
					.set({ searchItems: this.eventSearchItems2 }, { merge: true });
				db.collection("searchBar")
					.doc("peopleSearchBarOptions")
					.set({ searchItems: this.peopleSearchItems }, { merge: true });
				db.collection("searchBar")
					.doc("workSearchBarOptions")
					.set({ searchItems: this.workSearchItems }, { merge: true });
				db.collection("searchBar")
					.doc("termSearchBarOptions")
					.set({ searchItems: this.termSearchItems }, { merge: true });
				this.alert = true;
				this.alertMessage =
					"Search bar autofill content has been updated";
			});
		},
		async grabbingDBcontent() {
			await db
				.collection("topics")
				.get()
				.then(
					function(querySnapshot) {
						querySnapshot.docs.map((doc) => {
							this.topicSearchItems.push({
								document: doc.data(),
								collection: "topics",
								title: "Topic: " + doc.data().title,
								timePeriod: doc.data().timePeriod - 1,
							});
						});
					}.bind(this)
				);

			await db
				.collection("events")
				.get()
				.then(
					function(querySnapshot) {
						querySnapshot.docs.map((doc) => {
							if(this.eventSearchItems1.length < 50){
								this.eventSearchItems1.push({
									document: doc.data(),
									collection: "events",
									title: "Event: " + doc.data().title,
									topicID: doc.data().topicID[0],
								});
							}
							else{
								this.eventSearchItems2.push({
								document: doc.data(),
								collection: "events",
								title: "Event: " + doc.data().title,
								topicID: doc.data().topicID[0],
							});
							}
							
						});
					}.bind(this)
				);
			await db
				.collection("people")
				.get()
				.then(
					function(querySnapshot) {
						querySnapshot.docs.map((doc) => {
							console.log("updating Search PEOPLE" + doc.data().name)
							this.peopleSearchItems.push({
								document: doc.data(),
								collection: "people",
								title: "People: " + doc.data().name,
								topicID: doc.data().topicID[0],
							});
						});
					}.bind(this)
				);
			await db
				.collection("works")
				.get()
				.then(
					function(querySnapshot) {
						querySnapshot.docs.map((doc) => {
							this.workSearchItems.push({
								document: doc.data(),
								collection: "works",
								title: "Primary Source: " + doc.data().title,
								topicID: doc.data().topicID[0],
							});
						});
					}.bind(this)
				);
			await db
				.collection("terminology")
				.get()
				.then(
					function(querySnapshot) {
						querySnapshot.docs.map((doc) => {
							this.termSearchItems.push({
								document: doc.data(),
								collection: "terminology",
								title: "Term: " + doc.data().term,
								topicID: doc.data().topicID[0],
							});
						});
					}.bind(this)
				);
		},
	},
};
</script>

<style lang="scss" scoped></style>
