<template>
	<div class="traumatoA">
		<Table ref="tableRef">
			<template #navbarExtraActions>
			</template>
			<template #itemExtraButtons="data">
				<NButton @click="() => { currentItem = data; showAssetsModal = true; }" type="primary" secondary circle
					size="medium">
					<template #icon>
						<NIcon>
							<Icon name="tabler:folder" />
						</NIcon>
					</template>
				</NButton>
				<NButton @click="printingHandle(data)" type="info" secondary circle size="medium">
					<template #icon>
						<NIcon>
							<Icon name="tabler:printer" />
						</NIcon>
					</template>
				</NButton>
			</template>
		</Table>
		<NConfigProvider v-if="currentItem && !showAssetsModal" class="printable" :theme="null">
			<table>
				<thead>
					<tr>
						<td>
							<NFlex justify="center" style="cursor: pointer;" @click="onClickClosePrint">
								<img src="/chuo.jpeg" alt="Logo" height="100">
								<NH1 style="color: red !important;text-align: center;">COMPTE RENDU D'HOSPITALISATION
								</NH1>
								<img src="/traumatoA.png" alt="traumatoA" height="110">
							</NFlex>
							<NFlex vertical class="side">
								<NH5 style="border: solid;text-align: center;border-radius: 15px;margin: 0;">
									Traumatologie-Orthopédie A
								</NH5>
								<div class="staff">
									<strong>Chef de service</strong><br />
									Pr DAOUDI Abdelkrim<br /><br />

									<strong>Professeurs</strong><br />
									Pr Bouziane Walid<br />
									Pr Saddouki Mouhammed<br /><br />

									<strong>Major</strong><br />
									Mme MADANI Souad<br /><br />

									<strong>Résidents</strong><br />
									Dr Moncef Amahtil<br />
									Dr Khalil Ouda<br />
									Dr Khmilech Ilhame<br />
									Dr Ramdani Zakaria<br />
									Dr Abertal Mohammed<br />
									Dr Ousmane Djene Laye<br />
									Dr Jebari Jalal<br />
									Dr Hammouti Mohammed<br />
									Dr Aroud Amine<br />
									Dr Dafali Ismail<br />
									Dr Bouziani Soufiane<br />
									Dr Daoudi Abdelmounaim<br />
									Dr Lazar Issam<br />
									Dr Salissou saidou<br />
									Dr Belkadi Mohamed<br />
									Dr Nasser Mohammed<br />
									Dr Berraho Aymane<br />
									Dr Prince Joinel<br /><br />

									<strong>Internes</strong><br />
									Dr Abdelilah Houari<br />
								</div>
							</NFlex>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<NFlex justify="space-between" style="margin-left: 42px;" align="center">
								<NFlex vertical>
									<div v-if="currentItem.patient?.nom_complet" style="border: solid;padding: 0 5px;">
										<strong>Patient
											:</strong> {{
												currentItem.patient?.nom_complet }}
									</div>
									<div v-if="currentItem.patient?.IP" style="border: solid;padding: 0 5px;">
										<strong>IP
											:</strong> {{
												currentItem.patient?.IP
											}}
									</div>
								</NFlex>
								<NFlex vertical>
									<div v-if="currentItem.dateEntrée" style="border: solid;padding: 0 5px;">
										<strong>Date
											d'entrée
											:</strong> {{ new
												Date(currentItem.dateEntrée).toLocaleDateString('fr-FR') }}
									</div>
									<div v-if="currentItem.DateSortie" style="border: solid;padding: 0 5px;">
										<strong>Heure de
											sortie
											:</strong> {{ new
												Date(currentItem.DateSortie).toLocaleDateString('fr-FR') }}
									</div>
								</NFlex>
							</NFlex>
							<ul style="list-style-type:none;">
								<li v-if="currentItem.diagnostic"><strong>Diagnostic :</strong> {{
									currentItem.diagnostic.nom
								}}</li>
								<li v-if="currentItem.patient"><strong>Identité :</strong>
									<ul style="list-style-type:none;">
										<li>
											- Il s'agit d'un{{ currentItem.patient?.sexe === "femme" ? "e" :
												"" }}
											patient{{
												currentItem.patient?.sexe === "femme" ? "e" : "" }} âgé{{
												currentItem.patient?.sexe
													===
													"femme"
													?
													"e" : "" }} de {{ Math.floor((new Date().getTime() - new
												Date(currentItem.patient?.date_de_naissance).getTime()) /
												31557600000)
											}}
											ans<template v-if="currentItem.patient?.origine">, originaire et
												habitant{{
													currentItem.patient?.sexe ===
														"femme" ? "e" : "" }} à {{ currentItem.patient?.origine
												}}</template><template v-if="currentItem.patient?.profession">,
												ayant comme
												profession {{
													currentItem.patient?.profession }}</template><template
												v-if="currentItem.patient?.couverture_sanitaire">, et {{
													currentItem.patient?.couverture_sanitaire }} comme
												couverture
												sanitaire</template>
										</li>
									</ul>
								</li>
								<li v-if="currentItem.patient?.antécédents"><strong>ATCD :</strong><br />
									<ul style="list-style-type:none;">
										<li v-if="currentItem.patient?.antécédents.médicaux"><strong> -
												Médicaux :
											</strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.médicaux.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
										<li v-if="currentItem.patient?.antécédents.chirurgicaux"><strong> -
												Chirurgicaux :
											</strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.chirurgicaux.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
										<li
											v-if="currentItem.patient?.antécédents.obstétriques && currentItem.patient?.sexe === 'femme'">
											<strong>
												- Obstétriques : </strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.obstétriques.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
										<li
											v-if="currentItem.patient?.antécédents.obstétriques && currentItem.patient?.sexe === 'femme'">
											<strong>
												- Obstétriques : </strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.obstétriques.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
										<li v-if="currentItem.patient?.antécédents.allergiques"><strong> -
												Allergiques :
											</strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.allergiques.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
										<li v-if="currentItem.patient?.antécédents.mode_de_vie"><strong> -
												Mode de
												vie :
											</strong>
											<ul>
												<li v-for="(antecedent, index) in currentItem.patient?.antécédents.mode_de_vie.split('\n')"
													:key="index">{{ antecedent.trim() }}</li>
											</ul>
										</li>
									</ul>
								</li>
								<li v-if="currentItem.observation?.histoire_maladie" style="margin-top: 10px;">
									<strong>Histoire de la
										maladie :
									</strong>
									<ul style="list-style-type:none;">
										<li v-for="(histoire_maladie, index) in currentItem.observation.histoire_maladie.trim().split('\n')"
											:key="index">{{ histoire_maladie.trim().length ? '- ' : 'ㅤㅤㅤ'
											}}{{
												histoire_maladie.trim()
											}}</li>
									</ul>
								</li>
								<li v-if="currentItem.observation?.examen_clinique" style="margin-top: 10px;">
									<strong>Examen
										clinique
										:
									</strong>
									<ul style="list-style-type:none;">
										<li v-for="(examen_clinique, index) in currentItem.observation.examen_clinique.trim().split('\n')"
											:key="index">{{ examen_clinique.trim().length ? '- ' : 'ㅤㅤㅤ'
											}}{{
												examen_clinique.trim() }}
										</li>
									</ul>
								</li>
								<li v-if="currentItem.observation?.bilan_radiologique" style="margin-top: 10px;">
									<strong>Bilan
										Radiologique
										:
									</strong>
									<ul style="list-style-type:none;">
										<li v-for="(bilan_radiologique, index) in currentItem.observation.bilan_radiologique.trim().split('\n')"
											:key="index">{{ bilan_radiologique.trim().length ? '- ' : 'ㅤㅤㅤ'
											}}{{
												bilan_radiologique.trim() }}
										</li>
									</ul>
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<table v-if="currentItem.opération">
				<thead>
					<tr>
						<td>
							<NFlex justify="center" style="cursor: pointer;" @click="onClickClosePrint">
								<img src="/chuo.jpeg" alt="Logo" height="100">
								<NH1 style="color: red !important;text-align: center;">COMPTE RENDU OPÉRATOIRE</NH1>
								<img src="/traumatoA.png" alt="traumatoA" height="110">
							</NFlex>
							<NFlex vertical class="side">
								<NH5 style="border: solid;text-align: center;border-radius: 15px;margin: 0;">
									Traumatologie-Orthopédie A
								</NH5>
								<div class="staff">
									<strong>Chef de service</strong><br />
									Pr DAOUDI Abdelkrim<br /><br />

									<strong>Professeurs</strong><br />
									Pr Bouziane Walid<br />
									Pr Saddouki Mouhammed<br /><br />

									<strong>Major</strong><br />
									Mme MADANI Souad<br /><br />

									<strong>Résidents</strong><br />
									Dr Moncef Amahtil<br />
									Dr Khalil Ouda<br />
									Dr Khmilech Ilhame<br />
									Dr Ramdani Zakaria<br />
									Dr Abertal Mohammed<br />
									Dr Ousmane Djene Laye<br />
									Dr Jebari Jalal<br />
									Dr Hammouti Mohammed<br />
									Dr Aroud Amine<br />
									Dr Dafali Ismail<br />
									Dr Bouziani Soufiane<br />
									Dr Daoudi Abdelmounaim<br />
									Dr Lazar Issam<br />
									Dr Salissou saidou<br />
									Dr Belkadi Mohamed<br />
									Dr Nasser Mohammed<br />
									Dr Berraho Aymane<br />
									Dr Prince Joinel<br /><br />

									<strong>Internes</strong><br />
									Dr Abdelilah Houari<br />
								</div>
							</NFlex>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<NFlex justify="space-between" style="margin-left: 42px;" align="center">
								<NFlex vertical>
									<div v-if="currentItem.patient?.nom_complet" style="border: solid;padding: 0 5px;">
										<strong>Patient
											:</strong> {{
												currentItem.patient?.nom_complet }}
									</div>
									<div v-if="currentItem.patient?.IP" style="border: solid;padding: 0 5px;">
										<strong>IP
											:</strong> {{
												currentItem.patient?.IP
											}}
									</div>
								</NFlex>
								<NFlex vertical>
									<div v-if="currentItem.opération?.['code_d\'acte']"
										style="border: solid;padding: 0 5px;">
										<strong>Date d'opération
											:</strong> {{ new
												Date(currentItem.opération.date).toLocaleDateString('fr-FR') }}
										{{ currentItem.opération.durée ? `(${currentItem.opération.durée})` : '' }}
									</div>

									<div v-if="currentItem.opération?.date" style="border: solid;padding: 0 5px;">
										<strong>Date d'opération
											:</strong> {{ new
												Date(currentItem.opération.date).toLocaleDateString('fr-FR') }}
										{{ currentItem.opération.durée ? `(${currentItem.opération.durée})` : '' }}
									</div>
								</NFlex>
							</NFlex>
							<ul style="list-style-type:none;">
								<li v-if="currentItem.opération?.opérateurs">
									<strong>Opérateurs :</strong>
									{{ displayOpérateurs(currentItem.opération.opérateurs) }}
								</li>
								<NFlex>
									<li v-if="currentItem.opération?.['nom_d\'intervention']"><strong>Opération
											:</strong> {{
												currentItem.opération['nom_d\'intervention']
											}}</li>
									<li v-if="currentItem.opération?.anesthésiste"><strong>Anesthésiste :</strong> {{
										currentItem.opération.anesthésiste
									}}</li>
									<li v-if="currentItem.opération?.typeAnesthésie"><strong>Type d'anesthésie
											:</strong> {{
												currentItem.opération.typeAnesthésie
											}}</li>
									<li v-if="currentItem.opération?.installation"><strong>Installation :</strong> {{
										currentItem.opération.installation
									}}</li>
									<li v-if="currentItem.opération?.voie_abord"><strong>Voie Abord :</strong> {{
										currentItem.opération.voie_abord
									}}</li>
								</NFlex>
								<li v-if="currentItem.opération?.compte_rendu_opératoire" style="margin-top: 10px;">
									<strong>Compte Rendu Opératoire
										:</strong>
									<ul style="list-style-type:none;">
										<li v-for="(compte_rendu, index) in currentItem.opération.compte_rendu_opératoire.trim().split('\n')"
											:key="index">{{ compte_rendu.trim().length ? '- ' : 'ㅤㅤㅤ'
											}}{{ compte_rendu.trim() }}</li>
									</ul>
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</NConfigProvider>
		<NDrawer v-model:show="showAssetsModal" defaultHeight="50%" placement="bottom" resizable>
			<NDrawerContent id="assetsModal" :nativeScrollbar="false" :bodyContentStyle="{ padding: 0 }">
				<AssetCard targetID="assetsModal" :suffix="`/${currentItem?.patient?.nom_complet}`" />
			</NDrawerContent>
		</NDrawer>
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	middleware: ["database", "user", "dashboard", "table", "global"],
	layout: "table",
});

const tableRef = ref<TableRef>();
const currentItem = ref<Item>();
let originalTitle: string;
async function printingHandle(data: Item) {
	currentItem.value = data;
	originalTitle = document.title;
	document.title = `CR: ${data.patient.nom_complet}`;
}
function onClickClosePrint() {
	document.title = originalTitle;
	currentItem.value = undefined;
}

const database = useState<Database>("database");
const displayOpérateurs = (opérateurs: Item[]) => {
	return opérateurs
		.sort((a: Item, b: Item) => (b.professeur ? 1 : 0) - (a.professeur ? 1 : 0))
		.map(
			(operateur: Item) =>
				`${operateur.professeur ? "Pr " : "Dr "}${operateur.nom_complet}`,
		)
		.join(", ");
};
const showAssetsModal = ref(false);
watch(showAssetsModal, (newVal) => {
	if (!newVal) currentItem.value = undefined;
});
</script>
<style>
.table_traumatoA:before,
.traumatoA .printable:before {
	content: "";
	position: fixed;
	top: 64px;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: .3;
	height: calc(100% - 64px);
}

.traumatoA .printable:before {
	top: 150px;
	height: calc(100% - 150px);
	width: 80%;
	margin: auto;
	z-index: -1;
}

.light .table_traumatoA:before,
.traumatoA .printable:before {
	background-image: url('/traumatoA.png');
	background-repeat: no-repeat;
	background-size: contain;
	background-position-y: 10px;
	background-position-x: center;
}

.dark .table_traumatoA:before {
	background: #fff;
	mask-size: contain;
	mask-repeat: no-repeat;
	mask-position: bottom;
	mask-position: center 10px;
	mask-image: url("/traumatoA.png");
}

.printable .side {
	width: 220px;
	top: 120px;
	left: 20px;
	position: absolute;
}

.printable .staff {
	border: solid;
	border-radius: 15px;
	padding: 10px 20px;
	font-size: 16px;
	line-height: 16px;
}

.traumatoA .printable table {
	position: relative;
}

@media print {
	.traumatoA .printable thead {
		display: table-header-group;
	}

	.printable .side {
		position: fixed
	}
}

.traumatoA .printable tbody {
	width: calc(100% - 215px);
	display: block;
	margin-left: 215px;
}

.traumatoA .printable {
	background: #fff;
	color: #333;
	text-align: start;
	font-size: 16px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999999999999999;
	overflow: scroll;
	padding: 0 20px 0 0 !important;
	text-align: start;
}

.traumatoA .printable td>ul>li,
.traumatoA .printable td>ul>div>li {
	border: solid;
	margin-bottom: 10px;
	padding: 0 10px;
}

.traumatoA .printable td>ul>li>strong,
.traumatoA .printable td>ul>div>li>strong {
	text-decoration: underline;
}

.traumatoA .printable table {
	break-after: always;
}
</style>