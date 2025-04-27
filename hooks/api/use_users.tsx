import { createClient } from '@/utils/supabase/supabase_ client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetUser = (user_id?: string) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('users')
        .select(
          `
      *
    `
        )
        .eq('id', user_id!)
        .single()
      console.log({ data })
      if (error) throw error
      return data
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!user_id,
  })
}