<template>
	<v-container style="min-height: 100vh; min-width: 100vw;">
		<Header
			v-bind:header="'Hello!'"
			v-bind:description="'This page is not set up yet'"
		/>
	</v-container>
</template>

<script>
import Header from "@/components/DashboardHeaders.vue";

export default {
	components: { Header },
};
</script>

<style lang="scss" scoped></style>
