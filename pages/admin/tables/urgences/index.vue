<template>
	<div>
		<Table ref="tableRef">
			<template #navbarExtraActions>
			</template>
			<template #itemExtraButtons="data">
				<NDropdown :options="printingOptions" @select="(value) => printingHandle(value, data)">
					<NButton @click="printingHandle('observation', data)" type="info" secondary circle size="medium">
						<template #icon>
							<NIcon>
								<Icon name="tabler:printer" />
							</NIcon>
						</template>
					</NButton>
				</NDropdown>
			</template>
		</Table>
		<NConfigProvider v-if="currentItem && currentTemplate" :theme="null">
			<NFlex class="printTemplate printable" vertical>
				<NFlex justify="space-between" style="cursor: pointer;" @click="onClickClosePrint">
					<div>
						Royaume du Maroc<br />
						Ministère de la Santé et de la Protection Sociale<br />
						CHU Mohammed VI Oujda
					</div>
					<NQrCode v-if="currentItem.id"
						:value="`https://urgences.inicontent.com/admin/tables/urgences/${currentItem.id}`" :size="80" />
					<!-- <img src="/chuo.jpeg" alt="Logo" height="100"> -->
					<div>
						المملكة المغربية<br />
						وزارة الصحة والحماية الاجتماعية<br />
						المركز الاستشفائي الجامعي محمد السادس وجدة
					</div>
				</NFlex>
				<NH1 style="margin: 0;">{{printingOptions.find(option => option.key === currentTemplate)?.label}} de {{
					currentItem.patient.nom_complet }}</NH1>
				<table>
					<tbody>
						<tr>
							<th>Nom Complet</th>
							<th v-if="currentItem.patient.IP || currentItem.patient.CIN">{{ currentItem.patient.IP ?
								'IP' :
								currentItem.patient.CIN ? 'CIN' : '' }}</th>
							<th>Date de naissance</th>
							<th>Couverture Sanitaire</th>
						</tr>
						<tr>
							<td>{{ currentItem.patient.nom_complet ?? '--' }}</td>
							<td v-if="currentItem.patient.IP || currentItem.patient.CIN">{{ currentItem.patient.IP ??
								currentItem.patient.CIN ?? '--' }}</td>
							<td>
								{{ new Date(currentItem.patient.date_de_naissance).toLocaleDateString('fr-FR') }}
								({{ Math.floor((Date.now() - new Date(currentItem.patient.date_de_naissance).getTime())
									/ (1000
										*
										60 * 60
										* 24 * 365.25)) }} ans)
							</td>
							<td>{{ currentItem.patient.couverture_sanitaire ?? '--' }}</td>
						</tr>
					</tbody>
				</table>
				<LazyDataS style="text-align: left;"
					:schema="patientTable?.schema?.filter(item => item.id && [10].includes(item.id))"
					:value="currentItem.patient" disableScroll />
				<LazyDataS style="text-align: left;"
					:schema="table.schema?.filter(item => item.id && [1, 7, 33].includes(item.id))" :value="currentItem"
					disableScroll />
			</NFlex>
		</NConfigProvider>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: ["database", "user", "dashboard", "table", "global"],
	layout: "table",
})

const tableRef = ref<TableRef>()
type printTemplates = "observation" | "fiche_de_traitement"
const currentItem = ref<Item>()
const currentTemplate = ref<printTemplates>()
const printingOptions = [{ label: 'Observation', key: 'observation' }, { label: 'Fiche de traitement', key: 'fiche_de_traitement' }]
let originalTitle: string
async function printingHandle(value: printTemplates, data: Item) {
	currentItem.value = data
	currentTemplate.value = value
	originalTitle = document.title
	document.title = `${printingOptions.find(option => option.key === value)?.label} | ${data.patient.nom_complet}`
}
function onClickClosePrint() {
	document.title = originalTitle
	currentItem.value = undefined
	currentTemplate.value = undefined
}

const database = useState<Database>("database");
const patientTable = database.value.tables?.find(table => table.slug === 'patients')
const table = useState<Table>("table");
</script>

<style scoped>
.printTemplate {
	background: #fff;
	color: #333;
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999999999999999;
	overflow: auto;
	padding: 0 8px;
}

.printTemplate h1,
.printTemplate h2 {
	color: #000 !important;
}

.printTemplate table {
	border-collapse: collapse;
	margin-top: 10px;
	background-color: #fff;
}

.printTemplate th,
.printTemplate td {
	border: 1px solid #ccc;
	padding: 5px;
	text-align: center;
}

.printTemplate th {
	background-color: #f0f0f0;
}

.printTemplate .images {
	margin: 10px auto 0;
	text-align: center;
}

.printTemplate .images img {
	width: 150px;
	height: auto;
	margin: 0 5px;
	border: 1px solid #ccc;
	padding: 5px;
	background-color: #fff;
}

.printTemplate .attachments {
	margin: 10px auto;
	padding: 10px;
	background-color: #f0f0f0;
	border: 1px solid #ccc;
	display: inline-block;
}

.printTemplate .attachments span {
	font-size: 12px;
}

@media print {
	@page {
		size: auto !important;
	}

	table {
		page-break-inside: auto
	}

	tr {
		page-break-inside: avoid;
		page-break-after: auto
	}

	:global(.printTemplate .n-qr-code) {
		width: 80px !important;
		height: 80px !important;
		padding: 0 !important;
	}

	:global(.printTemplate .n-qr-code svg) {
		height: 100% !important;
		width: 100% !important;
	}
}
</style>