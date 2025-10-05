export default defineNuxtRouteMiddleware((from) => {
	const user = useState<User>("user")
	if ((from.name === 'database-admin-tables' || from.name === 'database-admin') && user.value.service)
		return navigateTo(`/admin/tables/${user.value.service}`)
})
