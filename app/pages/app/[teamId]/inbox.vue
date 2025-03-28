<script lang="ts" setup>
import { useInbox } from '~/store/inbox'
import { useTeams } from '~/store/teams'

definePageMeta({
    pageTransition: {
        name: '',
    },
})

const store = useInbox()
const route = useRoute<'app-teamId-inbox-id'>()

const isMobile = ref(false)

function checkMobile() {
    isMobile.value = window.innerWidth <= 824
}

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

const candidates = ref([
    {
        id: 1,
        name: 'Brandon Clark',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Thanks a bunch!',
        unreadMessages: 2,
        graduationStatus: 'Completed MAsters Degree',
        education: 'BSc in Computer Science, Stanford University (2015-2019).',
        experience: ['Frontend Developer, ABC Ltd (2020-2023)', 'Junior Developer, XYZ Ltd (2018-2020)'],
        country: 'United Kingdom',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
            { id: 1, sender: 'RecruitMate', text: 'Here are the suggestions for your', time: '10:04 AM' },
            { id: 2, sender: 'Brandon Clark', text: 'Thanks a bunch!', time: '10:04 AM' },
        ],
        jobTitle: 'Frontend Developer',
        skills: ['Typescript', 'Vue', 'React', 'OOP'],

    },
    {
        id: 2,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 2,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 3,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 4,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 6,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
    {
        id: 5,
        name: 'Casey',
        avatar: 'https://via.placeholder.com/40',
        lastMessage: 'Feel free to reach out to us if you...',
        unreadMessages: 0,
        graduationStatus: '',
        education: '',
        experience: [],
        country: '',
        messages: [
            { id: 1, sender: 'RecruitMate', text: 'You are welcome!', time: '10:04 AM' },
            { id: 2, sender: 'RecruitMate', text: 'Feel free to reach out to us if you need anything.', time: '10:04 AM' },
        ],
        jobTitle: '',
        skills: [],
    },
])

onMounted(() => {
    store.setCandidates(candidates.value)
    checkMobile()
    window.addEventListener('resize', checkMobile)
})
</script>

<template>
    <div class="page">
        <CommonApplicationMainLayout
            title="Campaign Inbox"
            :is-show-back-button="true"
            class="w-full"
        >
            <template #breadcrumbs>
                <Breadcrumb class="mt-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/app/:teamId/campaigns">
                                Campaigns
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="">
                                Project Manager
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator href="/inbox" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Marketing</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator v-if="store.selectedCandidate?.name" />
                        <BreadcrumbItem v-if="store.selectedCandidate?.name">
                            <BreadcrumbPage class="flex items-center justify-center gap-1">
                                <Icon name="ri:user-6-line" />
                                <span>
                                    {{ store.selectedCandidate?.name }}
                                </span>
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </template>
        </CommonApplicationMainLayout>

        <div class="clamp w-full h-full overflow-hidden flex-1">
            <div class="inbox">
                <PagesInboxSidebar
                    v-if="!(route.params?.id && isMobile)"
                    :class="{
                        'border-r-0': (isMobile && !route.params?.id),
                        'w-full': isMobile && !route.params?.id,
                    }"
                />
                <NuxtPage v-if="!(isMobile && !route.params?.id)" />
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.inbox {
    @apply flex-1 flex h-full border-r-0 !p-0  w-full md:border-r;
}
</style>
