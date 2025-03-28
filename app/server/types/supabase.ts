export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          company_logo: string | null
          created_at: string | null
          description: string | null
          hiring_company: string | null
          id: number
          name: string
          status: Database["public"]["Enums"]["campaign_status"] | null
          tags: Json | null
          template_id: number | null
          updated_at: string | null
        }
        Insert: {
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          hiring_company?: string | null
          id?: number
          name: string
          status?: Database["public"]["Enums"]["campaign_status"] | null
          tags?: Json | null
          template_id?: number | null
          updated_at?: string | null
        }
        Update: {
          company_logo?: string | null
          created_at?: string | null
          description?: string | null
          hiring_company?: string | null
          id?: number
          name?: string
          status?: Database["public"]["Enums"]["campaign_status"] | null
          tags?: Json | null
          template_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "template_email"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns_candidates: {
        Row: {
          campaign_id: number | null
          candidate_id: number | null
          email_body: string | null
          email_clicked: boolean | null
          email_opened: boolean | null
          email_replied: boolean | null
          email_sent: boolean | null
          email_subject: string | null
          id: number
          previewed: boolean | null
          status: string | null
          thread_id: string | null
        }
        Insert: {
          campaign_id?: number | null
          candidate_id?: number | null
          email_body?: string | null
          email_clicked?: boolean | null
          email_opened?: boolean | null
          email_replied?: boolean | null
          email_sent?: boolean | null
          email_subject?: string | null
          id?: number
          previewed?: boolean | null
          status?: string | null
          thread_id?: string | null
        }
        Update: {
          campaign_id?: number | null
          candidate_id?: number | null
          email_body?: string | null
          email_clicked?: boolean | null
          email_opened?: boolean | null
          email_replied?: boolean | null
          email_sent?: boolean | null
          email_subject?: string | null
          id?: number
          previewed?: boolean | null
          status?: string | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_candidates_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_candidates_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns_stats: {
        Row: {
          awaiting_feedback: number | null
          campaign_id: number | null
          created_at: string
          cron_interval: number
          id: number
          replied: number | null
          unread: number | null
        }
        Insert: {
          awaiting_feedback?: number | null
          campaign_id?: number | null
          created_at?: string
          cron_interval?: number
          id?: number
          replied?: number | null
          unread?: number | null
        }
        Update: {
          awaiting_feedback?: number | null
          campaign_id?: number | null
          created_at?: string
          cron_interval?: number
          id?: number
          replied?: number | null
          unread?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_stats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          phone: string | null
          resume: string | null
          resume_content: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
          resume?: string | null
          resume_content?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
          resume?: string | null
          resume_content?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inbox_setting: {
        Row: {
          created_at: string
          follow_up_duration: number | null
          id: number
          target_email: string | null
        }
        Insert: {
          created_at?: string
          follow_up_duration?: number | null
          id?: number
          target_email?: string | null
        }
        Update: {
          created_at?: string
          follow_up_duration?: number | null
          id?: number
          target_email?: string | null
        }
        Relationships: []
      }
      invited_members: {
        Row: {
          email: string
          id: number
          invite_date: string
          inviter: string
          token: string
        }
        Insert: {
          email: string
          id?: number
          invite_date?: string
          inviter: string
          token?: string
        }
        Update: {
          email?: string
          id?: number
          invite_date?: string
          inviter?: string
          token?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string | null
          date: string
          email_read: boolean | null
          from_email: string
          from_name: string
          header_references: string | null
          html_body: string | null
          id: number
          message_id: string
          source: string | null
          stripped_text_reply: string | null
          subject: string
          text_body: string | null
          thread_id: string
          to_email: string
        }
        Insert: {
          created_at?: string | null
          date: string
          email_read?: boolean | null
          from_email: string
          from_name: string
          header_references?: string | null
          html_body?: string | null
          id?: number
          message_id: string
          source?: string | null
          stripped_text_reply?: string | null
          subject: string
          text_body?: string | null
          thread_id: string
          to_email: string
        }
        Update: {
          created_at?: string | null
          date?: string
          email_read?: boolean | null
          from_email?: string
          from_name?: string
          header_references?: string | null
          html_body?: string | null
          id?: number
          message_id?: string
          source?: string | null
          stripped_text_reply?: string | null
          subject?: string
          text_body?: string | null
          thread_id?: string
          to_email?: string
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          auth_id: string | null
          avatar: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: number
          last_name: string | null
          role: string | null
          signature_text: string | null
          status: string | null
          tos_accepted: boolean | null
          updated_at: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: string | null
          signature_text?: string | null
          status?: string | null
          tos_accepted?: boolean | null
          updated_at?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
          role?: string | null
          signature_text?: string | null
          status?: string | null
          tos_accepted?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_default: boolean | null
          logo: string | null
          name: string | null
          owner_id: number | null
          permissions_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_default?: boolean | null
          logo?: string | null
          name?: string | null
          owner_id?: number | null
          permissions_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_default?: boolean | null
          logo?: string | null
          name?: string | null
          owner_id?: number | null
          permissions_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "recruiters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_permissions_id_fkey"
            columns: ["permissions_id"]
            isOneToOne: false
            referencedRelation: "teams_permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      teams_campaign: {
        Row: {
          campaign_id: number
          id: number
          team_id: number | null
        }
        Insert: {
          campaign_id: number
          id?: number
          team_id?: number | null
        }
        Update: {
          campaign_id?: number
          id?: number
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_candidates_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_candidates_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams_members: {
        Row: {
          id: number
          invite_date: string
          permissions: Json
          role: string
          team_id: number | null
        }
        Insert: {
          id?: number
          invite_date?: string
          permissions?: Json
          role?: string
          team_id?: number | null
        }
        Update: {
          id?: number
          invite_date?: string
          permissions?: Json
          role?: string
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams_permissions: {
        Row: {
          id: string
          permissions: Json[] | null
          team_id: number | null
        }
        Insert: {
          id?: string
          permissions?: Json[] | null
          team_id?: number | null
        }
        Update: {
          id?: string
          permissions?: Json[] | null
          team_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_permissions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      template_email: {
        Row: {
          created_at: string
          description: string | null
          email_body: string | null
          email_subject: string | null
          id: number
          tags: Json | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email_body?: string | null
          email_subject?: string | null
          id?: number
          tags?: Json | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email_body?: string | null
          email_subject?: string | null
          id?: number
          tags?: Json | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      campaign_status: "running" | "draft"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

