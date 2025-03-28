export interface Candidates {
    id: number
    name: string
    avatar: string
    lastMessage: string
    unreadMessages: number
    graduationStatus: string
    education: string
    experience: string[]
    country: string
    messages: {
        id: number
        sender: string
        text: string
        time: string
    }[]
    jobTitle: string
    skills: string[]
}

interface StateInbox {
    candidates: Candidates[]
}

export const useInbox = defineStore('inbox', {
    state: (): StateInbox => ({
        candidates: [],
    }),

    getters: {
        selectedCandidate: (state) => {
            const route = useRoute<'app-teamId-inbox-id'>()
            const id = Number(route.params.id)
            return state.candidates.find(c => c.id === id)
        },
    },

    actions: {
        setCandidates(candidates: Candidates[]) {
            this.candidates = candidates
        },
        sendMessage(message: string, candidateId: number) {
            const candidate = this.candidates.find(c => c.id === candidateId)
            if (message.trim() && candidate) {
                candidate.messages.push({
                    id: Date.now(),
                    sender: 'You',
                    text: message,
                    time: new Date().toLocaleTimeString(),
                })
            }
        },
    },
})
