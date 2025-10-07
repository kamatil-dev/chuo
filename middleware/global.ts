export default defineNuxtRouteMiddleware((from) => {
	const user = useState<User>("user");
	if (
		(from.name === "auth" ||
			from.name === "database-auth" ||
			from.name === "database" ||
			from.name === "database-admin" ||
			from.name === "database-admin-tables" ||
			from.name === "database-admin") &&
		user.value?.service
	)
		return navigateTo(`/admin/tables/${user.value.service}`);
});
