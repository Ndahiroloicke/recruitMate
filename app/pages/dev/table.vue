<script setup lang="ts">
import type { Column } from '~/components/common/general/Table.vue'

const columns: Column<Invoice>[] = [
    { key: 'invoice', label: 'Invoice', hiddenOn: 'sm' },
    { key: 'status', label: 'Status' },
    { key: 'method', label: 'Payment Method', hiddenOn: 'md' },
    { key: 'amount', label: 'Amount', class: 'text-right', align: 'right' },
]

interface Invoice {
    invoice: string
    status: string
    method: string
    amount: string
}

const invoices: Invoice[] = [
    { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV003', status: 'Overdue', method: 'Bank Transfer', amount: '$500.00' },
]

const selectedInvoices = ref<number[]>([])
</script>

<template>
    <div>
        <CommonGeneralTable v-model="selectedInvoices" :columns="columns" :data="invoices" selectable />
    </div>
</template>
