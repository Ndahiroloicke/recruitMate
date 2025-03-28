interface RowData {
    id: string | number
}

interface StateSelectStore {
    selectedRows: RowData[]
    isEdited: boolean
    direction: string
}

export const useCampaigns = defineStore('campaigns', {
    state: (): StateSelectStore => ({
        selectedRows: [],
        isEdited: false,
        direction: 'asc',

    }),

    getters: {
        selectedRowIds: state => state.selectedRows,
        isRowSelected: state => (id: string | number) =>
            state.selectedRows.some(row => row.id === id),
    },

    actions: {
        updateSelectedStatus(status: string) {
            this.selectedStatus = status
        },

        setSelectedRows(rows: RowData[]) {
            if (!this.isEdited) {
                this.selectedRows = rows
            }
        },

        addSelectedRow(item: any) {
            if (this.isEdited) {
                const exists = this.isRowSelected(item.id)
                if (!exists) {
                    this.selectedRows.push(item)
                }
                else {
                    this.removeSelectedRow(item.id)
                }
            }
        },

        removeSelectedRow(id: string | number) {
            this.selectedRows = this.selectedRows.filter(row => row.id !== id)
        },

        clearSelection() {
            this.selectedRows = []
            this.isEdited = false
        },
        setDirection(newDirection: 'asc' | 'desc') {
            this.direction = newDirection
        },
    },
})
