import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ApiService from '@/utils/api'

interface Problem {
    _id: string
    orderId: string
    problemType: string
    description: string
    status: string
    createdAt: string
}

export const useProblemHistory = () => {
    const [problems, setProblems] = useState<Problem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const loadProblems = async () => {
        try {
            setLoading(true)
            setError(null)

            const problemsData = await ApiService.getProblems()
            setProblems(problemsData)

        } catch (error: any) {
            console.error('Failed to load problems:', error)
            setError(error.message || 'Failed to load problems')

            // If authentication error, redirect to login
            if (error.message?.includes('token') || error.message?.includes('authorization')) {
                router.push('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    const refreshProblems = () => {
        loadProblems()
    }

    const getStats = () => {
        const total = problems.length
        const pending = problems.filter(p => p.status === 'pending').length
        const resolved = problems.filter(p => p.status === 'resolved').length
        const escalated = problems.filter(p => p.status === 'escalated').length

        return { total, pending, resolved, escalated }
    }

    const filterProblemsByStatus = (status?: string) => {
        if (!status) return problems
        return problems.filter(problem => problem.status === status)
    }

    useEffect(() => {
        loadProblems()
    }, [])

    return {
        problems,
        loading,
        error,
        loadProblems,
        refreshProblems,
        getStats,
        filterProblemsByStatus
    }
}