<script setup lang="ts">
import { toRefs, computed, inject, watch, type ComputedRef } from 'vue';
import { useItems, useCollection } from '@directus/extensions-sdk';

const interpolationRegex = /{{\s*(.+)\s*}}/g;

const props = defineProps<{
	collection: string;
	'primary-key': string;
	fieldSrc: string;
	fieldAlt: string;
	fieldWidth: string;
	fieldHeight: string;
	fieldFit: string;
}>()

const { 'primary-key': primaryKey, collection, fieldSrc, fieldAlt, fieldWidth, fieldHeight, fieldFit } = toRefs(props);

const values = inject<ComputedRef<Record<string, any>>>('values');

const collectionStore = useCollection(collection)

const filter = computed(() => {
	const primaryKeyField = collectionStore.primaryKeyField.value?.field
	if (!primaryKeyField) return null

	return {
		[primaryKeyField]: primaryKey
	}
})

const fields = computed(() => {
	const srcMatches = fieldSrc.value ? [...fieldSrc.value.matchAll(interpolationRegex)].map(m => m[1]) : [];
	const altMatches = fieldAlt.value ? [...fieldAlt.value.matchAll(interpolationRegex)].map(m => m[1]) : [];

	return [
		...srcMatches,
		...altMatches
	]
})

const itemsStore = useItems(collection, { filter: filter, fields: fields, limit: 1 })

function fetch() {
	if (fields.value.length) {
		itemsStore.getItems()
	}
}

watch(values, function (values) {
	for (const field of fields.value) {
		if (field && !getNestedValue(values, field)) {
			return fetch();
		}
	}
})



const imgSrc = computed(() => {
	if (!fieldSrc.value) return ""

	return fieldSrc.value.replace(interpolationRegex, function (_: string, path: string) {
		return (getNestedValue(values?.value || {}, path) || getNestedValue(itemsStore.items.value.at(0) || {}, path)) as any as string
	})
})

const imgAlt = computed(() => {
	if (!fieldAlt.value) return ""

	return fieldAlt.value.replace(interpolationRegex, function (_: string, path: string) {
		return (getNestedValue(values?.value || {}, path) || getNestedValue(itemsStore.items.value.at(0) || {}, path)) as any as string
	})
})

const width = computed(() => {
	return isNumeric(fieldWidth.value) ? fieldWidth.value + 'px' : fieldWidth.value
})

const height = computed(() => {
	return isNumeric(fieldHeight.value) ? fieldHeight.value + 'px' : fieldHeight.value
})

const fit = computed(() => fieldFit.value || 'contain')

function getNestedValue(obj: Record<string, any>, path: string) {
	return path.split('.').reduce((acc, key) => acc?.[key] && Array.isArray(acc[key]) ? acc?.[key][0] : acc?.[key], obj);
}

function isNumeric(str: string) {
	return /^[0-9]+$/.test(str);
}

</script>

<template>
	<img :src="imgSrc" :alt="imgAlt" :style="{ objectFit: fit, width, height }" />
</template>