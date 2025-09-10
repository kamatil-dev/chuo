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
				<NFlex justify="space-between">
					<NQrCode v-if="currentItem.id" :value="currentItem.id" :size="80" />
					<img @click="onClickClosePrint" src="/chuo.png" alt="Logo" height="150">
					<div>
						<strong>Service des Urgences</strong>
						<p>Créé le:
							<NTime :time="currentItem.createdAt" type="date" />
						</p>
						<p v-if="currentItem.updatedAt">Modifié le:
							<NTime :time="currentItem.updatedAt" type="date" />
						</p>
					</div>
				</NFlex>
				<NH1 style="margin: 0;">{{printingOptions.find(option => option.key === currentTemplate)?.label}} de {{
					currentItem.nom_complet }}</NH1>
				<NH2 style="margin: 0;">{{ currentItem.nom_complet }}</NH2>
				<table>
					<tbody>
						<tr>
							<th>Nom Complet</th>
							<th>IP</th>
							<th>CIN</th>
							<th>Date de naissance</th>
						</tr>
						<tr>
							<td>{{ currentItem.nom_complet ?? '--' }}</td>
							<td>{{ currentItem.IP ?? '--' }}</td>
							<td>{{ currentItem.CIN ?? '--' }}</td>
							<td v-if="currentItem.date_de_naissance">
								{{ new Date(currentItem.date_de_naissance).toLocaleDateString('fr-FR') }}
								({{ Math.floor((Date.now() - new Date(currentItem.date_de_naissance).getTime()) / (1000
									*
									60 * 60
									* 24 * 365.25)) }} ans)
							</td>
						</tr>
					</tbody>
				</table>
				<LazyDataS style="text-align: left;" :schema="PrintSchema" :value="currentItem" />

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

const currentItem = ref<Item>()
const currentTemplate = ref<printTemplates>()
const printingOptions = [{ label: 'Observation', key: 'observation' }, { label: 'Fiche de traitement', key: 'fiche_de_traitement' }]
let originalTitle: string
async function printingHandle(value: "observation" | "fiche_de_traitement", data: Item) {
	currentItem.value = data
	currentTemplate.value = value
	originalTitle = document.title
	document.title = `${printingOptions.find(option => option.key === value)?.label} | ${data.nom_complet}`
}
function onClickClosePrint() {
	document.title = originalTitle
	currentItem.value = undefined
	currentTemplate.value = undefined
}
const PrintSchema = [{ key: 'motif', type: 'string' }, { key: 'ATCD', type: 'string', subType: 'textarea' },
{ key: 'histoire_de_la_maladie', type: 'string', subType: 'textarea' }
]
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