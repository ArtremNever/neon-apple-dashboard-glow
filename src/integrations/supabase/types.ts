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
      ad_accounts: {
        Row: {
          account_name: string
          created_at: string
          credentials: Json | null
          id: string
          platform: string
          platform_account_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name: string
          created_at?: string
          credentials?: Json | null
          id?: string
          platform: string
          platform_account_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string
          created_at?: string
          credentials?: Json | null
          id?: string
          platform?: string
          platform_account_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ad_groups: {
        Row: {
          ad_account_id: string | null
          bid_amount: number | null
          bid_strategy: string | null
          created_at: string | null
          external_id: string
          id: string
          name: string
          parent_campaign_id: string
          platform_data: Json | null
          source_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          ad_account_id?: string | null
          bid_amount?: number | null
          bid_strategy?: string | null
          created_at?: string | null
          external_id: string
          id?: string
          name: string
          parent_campaign_id: string
          platform_data?: Json | null
          source_type: string
          status: string
          updated_at?: string | null
        }
        Update: {
          ad_account_id?: string | null
          bid_amount?: number | null
          bid_strategy?: string | null
          created_at?: string | null
          external_id?: string
          id?: string
          name?: string
          parent_campaign_id?: string
          platform_data?: Json | null
          source_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_groups_parent_campaign_id_fkey"
            columns: ["parent_campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_sources: {
        Row: {
          created_at: string | null
          credentials_encrypted: Json
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          oauth_data: Json | null
          rate_limit_config: Json | null
          source_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credentials_encrypted: Json
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          oauth_data?: Json | null
          rate_limit_config?: Json | null
          source_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credentials_encrypted?: Json
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          oauth_data?: Json | null
          rate_limit_config?: Json | null
          source_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ads: {
        Row: {
          ad_account_id: string | null
          ad_format: string | null
          created_at: string | null
          external_id: string
          id: string
          name: string
          parent_adset_id: string | null
          parent_campaign_id: string
          platform_data: Json
          source_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          ad_account_id?: string | null
          ad_format?: string | null
          created_at?: string | null
          external_id: string
          id?: string
          name: string
          parent_adset_id?: string | null
          parent_campaign_id: string
          platform_data?: Json
          source_type: string
          status: string
          updated_at?: string | null
        }
        Update: {
          ad_account_id?: string | null
          ad_format?: string | null
          created_at?: string | null
          external_id?: string
          id?: string
          name?: string
          parent_adset_id?: string | null
          parent_campaign_id?: string
          platform_data?: Json
          source_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_parent_adset_id_fkey"
            columns: ["parent_adset_id"]
            isOneToOne: false
            referencedRelation: "ad_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_parent_campaign_id_fkey"
            columns: ["parent_campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_long_term_memory: {
        Row: {
          client_id: string
          confidence: number | null
          content: string
          created_at: string | null
          embedding: string | null
          fact_type: string
          id: string
          is_active: boolean | null
          last_accessed_at: string | null
          meta_data: Json | null
          source_id: string | null
          source_ref: string | null
          source_type: string | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          client_id: string
          confidence?: number | null
          content: string
          created_at?: string | null
          embedding?: string | null
          fact_type: string
          id?: string
          is_active?: boolean | null
          last_accessed_at?: string | null
          meta_data?: Json | null
          source_id?: string | null
          source_ref?: string | null
          source_type?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          client_id?: string
          confidence?: number | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          fact_type?: string
          id?: string
          is_active?: boolean | null
          last_accessed_at?: string | null
          meta_data?: Json | null
          source_id?: string | null
          source_ref?: string | null
          source_type?: string | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_long_term_memory_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_memory_episodes: {
        Row: {
          checkpoint_id: string | null
          client_id: string
          consolidated_into: string | null
          content: string | null
          context: Json
          context_embedding: string | null
          created_at: string | null
          decisions: Json | null
          embedding: string | null
          episode_type: string | null
          graph_state: Json | null
          id: string
          importance: number | null
          is_consolidated: boolean | null
          lessons_learned: string[] | null
          metadata: Json | null
          occurred_at: string | null
          outcomes: Json | null
          success_score: number | null
          summary: string | null
          thread_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          checkpoint_id?: string | null
          client_id: string
          consolidated_into?: string | null
          content?: string | null
          context: Json
          context_embedding?: string | null
          created_at?: string | null
          decisions?: Json | null
          embedding?: string | null
          episode_type?: string | null
          graph_state?: Json | null
          id?: string
          importance?: number | null
          is_consolidated?: boolean | null
          lessons_learned?: string[] | null
          metadata?: Json | null
          occurred_at?: string | null
          outcomes?: Json | null
          success_score?: number | null
          summary?: string | null
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          checkpoint_id?: string | null
          client_id?: string
          consolidated_into?: string | null
          content?: string | null
          context?: Json
          context_embedding?: string | null
          created_at?: string | null
          decisions?: Json | null
          embedding?: string | null
          episode_type?: string | null
          graph_state?: Json | null
          id?: string
          importance?: number | null
          is_consolidated?: boolean | null
          lessons_learned?: string[] | null
          metadata?: Json | null
          occurred_at?: string | null
          outcomes?: Json | null
          success_score?: number | null
          summary?: string | null
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_memory_episodes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_memory_episodes_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["thread_id"]
          },
          {
            foreignKeyName: "agent_memory_episodes_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "graph_threads"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      agent_memory_patterns: {
        Row: {
          applicable_conditions: Json | null
          applicable_platforms: string[] | null
          client_id: string
          confidence: number | null
          created_at: string | null
          description: string | null
          embedding: string | null
          episode_count: number | null
          first_seen: string | null
          id: string
          is_active: boolean | null
          last_seen: string | null
          last_used: string | null
          last_used_at: string | null
          pattern_data: Json
          pattern_name: string | null
          pattern_type: string | null
          success_count: number | null
          success_rate: number | null
          updated_at: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          applicable_conditions?: Json | null
          applicable_platforms?: string[] | null
          client_id: string
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          episode_count?: number | null
          first_seen?: string | null
          id?: string
          is_active?: boolean | null
          last_seen?: string | null
          last_used?: string | null
          last_used_at?: string | null
          pattern_data: Json
          pattern_name?: string | null
          pattern_type?: string | null
          success_count?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          applicable_conditions?: Json | null
          applicable_platforms?: string[] | null
          client_id?: string
          confidence?: number | null
          created_at?: string | null
          description?: string | null
          embedding?: string | null
          episode_count?: number | null
          first_seen?: string | null
          id?: string
          is_active?: boolean | null
          last_seen?: string | null
          last_used?: string | null
          last_used_at?: string | null
          pattern_data?: Json
          pattern_name?: string | null
          pattern_type?: string | null
          success_count?: number | null
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_memory_patterns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_procedural_memory: {
        Row: {
          applicable_conditions: Json | null
          applicable_platforms: string[] | null
          created_at: string | null
          expected_outcomes: Json | null
          id: string
          last_used_at: string | null
          prerequisites: Json | null
          procedure_name: string
          procedure_type: string
          steps: Json
          success_rate: number | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          applicable_conditions?: Json | null
          applicable_platforms?: string[] | null
          created_at?: string | null
          expected_outcomes?: Json | null
          id?: string
          last_used_at?: string | null
          prerequisites?: Json | null
          procedure_name: string
          procedure_type: string
          steps: Json
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          applicable_conditions?: Json | null
          applicable_platforms?: string[] | null
          created_at?: string | null
          expected_outcomes?: Json | null
          id?: string
          last_used_at?: string | null
          prerequisites?: Json | null
          procedure_name?: string
          procedure_type?: string
          steps?: Json
          success_rate?: number | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      agent_short_term_memory: {
        Row: {
          client_id: string | null
          context: Json | null
          created_at: string | null
          expires_at: string | null
          id: string
          importance_score: number | null
          message_content: string
          message_embedding: string | null
          message_role: string
          thread_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          context?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          importance_score?: number | null
          message_content: string
          message_embedding?: string | null
          message_role: string
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          context?: Json | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          importance_score?: number | null
          message_content?: string
          message_embedding?: string | null
          message_role?: string
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_short_term_memory_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      api_request_log: {
        Row: {
          created_at: string | null
          endpoint: string
          error_message: string | null
          id: string
          request_date: string
          request_timestamp: string
          request_type: string
          response_status: number | null
          source_type: string
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          error_message?: string | null
          id?: string
          request_date?: string
          request_timestamp?: string
          request_type: string
          response_status?: number | null
          source_type: string
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          error_message?: string | null
          id?: string
          request_date?: string
          request_timestamp?: string
          request_type?: string
          response_status?: number | null
          source_type?: string
        }
        Relationships: []
      }
      applied_migrations: {
        Row: {
          applied_at: string
          filename: string
          id: number
        }
        Insert: {
          applied_at?: string
          filename: string
          id?: number
        }
        Update: {
          applied_at?: string
          filename?: string
          id?: number
        }
        Relationships: []
      }
      appsflyer_cache: {
        Row: {
          app_id: string
          created_at: string | null
          data: Json
          date_from: string
          date_to: string
          expires_at: string
          id: string
          report_type: string
        }
        Insert: {
          app_id: string
          created_at?: string | null
          data: Json
          date_from: string
          date_to: string
          expires_at: string
          id?: string
          report_type: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          data?: Json
          date_from?: string
          date_to?: string
          expires_at?: string
          id?: string
          report_type?: string
        }
        Relationships: []
      }
      async_jobs: {
        Row: {
          args: Json
          celery_task_id: string | null
          completed_at: string | null
          created_at: string | null
          error: string | null
          failed_at: string | null
          id: string
          result: Json | null
          started_at: string | null
          status: string
          thread_id: string | null
          tool_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          args?: Json
          celery_task_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          failed_at?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          thread_id?: string | null
          tool_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          args?: Json
          celery_task_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          error?: string | null
          failed_at?: string | null
          id?: string
          result?: Json | null
          started_at?: string | null
          status?: string
          thread_id?: string | null
          tool_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          error_message: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          new_value: Json | null
          old_value: Json | null
          resource_id: string | null
          resource_type: string | null
          status: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          new_value?: Json | null
          old_value?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          new_value?: Json | null
          old_value?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      campaign_configuration_patterns: {
        Row: {
          campaign_settings: Json
          client_id: string | null
          created_at: string | null
          created_by: string | null
          created_from_campaigns: string[] | null
          id: string
          is_active: boolean | null
          last_used_at: string | null
          pattern_name: string
          pattern_type: string
          performance_metrics: Json | null
          source_type: string
          success_score: number | null
          tags: string[] | null
          updated_at: string | null
          usage_count: number | null
          vertical: string | null
        }
        Insert: {
          campaign_settings: Json
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_from_campaigns?: string[] | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          pattern_name: string
          pattern_type: string
          performance_metrics?: Json | null
          source_type: string
          success_score?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          vertical?: string | null
        }
        Update: {
          campaign_settings?: Json
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          created_from_campaigns?: string[] | null
          id?: string
          is_active?: boolean | null
          last_used_at?: string | null
          pattern_name?: string
          pattern_type?: string
          performance_metrics?: Json | null
          source_type?: string
          success_score?: number | null
          tags?: string[] | null
          updated_at?: string | null
          usage_count?: number | null
          vertical?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_configuration_patterns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_drafts: {
        Row: {
          ads: Json | null
          adsets: Json | null
          based_on_campaign_id: string | null
          based_on_pattern_id: string | null
          created_at: string | null
          created_by_user_id: string
          id: string
          is_active: boolean
          missing_fields: Json | null
          params: Json | null
          platform: string | null
          status: Database["public"]["Enums"]["draft_status"] | null
          suggestions: Json | null
          thread_id: string
          updated_at: string | null
          user_id: string
          validation_errors: Json | null
        }
        Insert: {
          ads?: Json | null
          adsets?: Json | null
          based_on_campaign_id?: string | null
          based_on_pattern_id?: string | null
          created_at?: string | null
          created_by_user_id: string
          id?: string
          is_active?: boolean
          missing_fields?: Json | null
          params?: Json | null
          platform?: string | null
          status?: Database["public"]["Enums"]["draft_status"] | null
          suggestions?: Json | null
          thread_id: string
          updated_at?: string | null
          user_id: string
          validation_errors?: Json | null
        }
        Update: {
          ads?: Json | null
          adsets?: Json | null
          based_on_campaign_id?: string | null
          based_on_pattern_id?: string | null
          created_at?: string | null
          created_by_user_id?: string
          id?: string
          is_active?: boolean
          missing_fields?: Json | null
          params?: Json | null
          platform?: string | null
          status?: Database["public"]["Enums"]["draft_status"] | null
          suggestions?: Json | null
          thread_id?: string
          updated_at?: string | null
          user_id?: string
          validation_errors?: Json | null
        }
        Relationships: []
      }
      campaign_success_analysis: {
        Row: {
          analysis_date: string
          analysis_type: string
          campaign_id: string
          created_at: string | null
          id: string
          pattern_id: string | null
          performance_data: Json
          recommendations: Json | null
          success_factors: Json | null
        }
        Insert: {
          analysis_date: string
          analysis_type: string
          campaign_id: string
          created_at?: string | null
          id?: string
          pattern_id?: string | null
          performance_data: Json
          recommendations?: Json | null
          success_factors?: Json | null
        }
        Update: {
          analysis_date?: string
          analysis_type?: string
          campaign_id?: string
          created_at?: string | null
          id?: string
          pattern_id?: string | null
          performance_data?: Json
          recommendations?: Json | null
          success_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_success_analysis_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_success_analysis_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "campaign_configuration_patterns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ad_account_id: string | null
          budget_mode: string | null
          campaign_type: string | null
          client_app_id: string
          created_at: string | null
          created_by_user_id: string | null
          daily_budget: number | null
          end_date: string | null
          external_id: string
          id: string
          name: string
          platform_campaign_id: string | null
          platform_data: Json
          source_type: string
          start_date: string | null
          status: string
          total_budget: number | null
          updated_at: string | null
        }
        Insert: {
          ad_account_id?: string | null
          budget_mode?: string | null
          campaign_type?: string | null
          client_app_id: string
          created_at?: string | null
          created_by_user_id?: string | null
          daily_budget?: number | null
          end_date?: string | null
          external_id: string
          id?: string
          name: string
          platform_campaign_id?: string | null
          platform_data?: Json
          source_type: string
          start_date?: string | null
          status: string
          total_budget?: number | null
          updated_at?: string | null
        }
        Update: {
          ad_account_id?: string | null
          budget_mode?: string | null
          campaign_type?: string | null
          client_app_id?: string
          created_at?: string | null
          created_by_user_id?: string | null
          daily_budget?: number | null
          end_date?: string | null
          external_id?: string
          id?: string
          name?: string
          platform_campaign_id?: string | null
          platform_data?: Json
          source_type?: string
          start_date?: string | null
          status?: string
          total_budget?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_client_app_id_fkey"
            columns: ["client_app_id"]
            isOneToOne: false
            referencedRelation: "client_apps"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          client_id: string | null
          content: string
          created_at: string
          id: string
          message_metadata: Json | null
          role: Database["public"]["Enums"]["messagerole"]
          thread_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          content: string
          created_at?: string
          id: string
          message_metadata?: Json | null
          role: Database["public"]["Enums"]["messagerole"]
          thread_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          content?: string
          created_at?: string
          id?: string
          message_metadata?: Json | null
          role?: Database["public"]["Enums"]["messagerole"]
          thread_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      checkpoint_audit: {
        Row: {
          action: string
          checkpoint_id: string
          created_at: string | null
          id: string
          metadata: Json | null
          thread_id: string
          user_id: string | null
        }
        Insert: {
          action: string
          checkpoint_id: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          thread_id: string
          user_id?: string | null
        }
        Update: {
          action?: string
          checkpoint_id?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          thread_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      checkpoint_blobs: {
        Row: {
          blob: string | null
          channel: string
          checkpoint_ns: string
          created_at: string | null
          thread_id: string
          type: string
          version: string
        }
        Insert: {
          blob?: string | null
          channel: string
          checkpoint_ns?: string
          created_at?: string | null
          thread_id: string
          type: string
          version: string
        }
        Update: {
          blob?: string | null
          channel?: string
          checkpoint_ns?: string
          created_at?: string | null
          thread_id?: string
          type?: string
          version?: string
        }
        Relationships: []
      }
      checkpoint_migrations: {
        Row: {
          v: number
        }
        Insert: {
          v: number
        }
        Update: {
          v?: number
        }
        Relationships: []
      }
      checkpoint_writes: {
        Row: {
          blob: string | null
          channel: string
          checkpoint_id: string
          checkpoint_ns: string
          created_at: string | null
          idx: number
          task_id: string
          task_path: string | null
          thread_id: string
          type: string | null
        }
        Insert: {
          blob?: string | null
          channel: string
          checkpoint_id: string
          checkpoint_ns?: string
          created_at?: string | null
          idx: number
          task_id: string
          task_path?: string | null
          thread_id: string
          type?: string | null
        }
        Update: {
          blob?: string | null
          channel?: string
          checkpoint_id?: string
          checkpoint_ns?: string
          created_at?: string | null
          idx?: number
          task_id?: string
          task_path?: string | null
          thread_id?: string
          type?: string | null
        }
        Relationships: []
      }
      checkpoints: {
        Row: {
          checkpoint: Json
          checkpoint_id: string
          checkpoint_ns: string
          created_at: string | null
          metadata: Json
          parent_checkpoint_id: string | null
          thread_id: string
          type: string | null
        }
        Insert: {
          checkpoint: Json
          checkpoint_id: string
          checkpoint_ns?: string
          created_at?: string | null
          metadata?: Json
          parent_checkpoint_id?: string | null
          thread_id: string
          type?: string | null
        }
        Update: {
          checkpoint?: Json
          checkpoint_id?: string
          checkpoint_ns?: string
          created_at?: string | null
          metadata?: Json
          parent_checkpoint_id?: string | null
          thread_id?: string
          type?: string | null
        }
        Relationships: []
      }
      client_apps: {
        Row: {
          client_id: string
          created_at: string | null
          event_mapping: Json | null
          event_window: number | null
          id: string
          metadata: Json | null
          mmp_app_id: string
          name: string
          payout_value: number | null
          platform: string
          revshare_percent: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          event_mapping?: Json | null
          event_window?: number | null
          id?: string
          metadata?: Json | null
          mmp_app_id: string
          name: string
          payout_value?: number | null
          platform: string
          revshare_percent?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          event_mapping?: Json | null
          event_window?: number | null
          id?: string
          metadata?: Json | null
          mmp_app_id?: string
          name?: string
          payout_value?: number | null
          platform?: string
          revshare_percent?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_apps_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          mmp_type: string
          name: string
          payment_model: Database["public"]["Enums"]["paymentmodel"]
          settings: Json | null
          status: Database["public"]["Enums"]["clientstatus"] | null
          updated_at: string | null
          vertical: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          mmp_type: string
          name: string
          payment_model: Database["public"]["Enums"]["paymentmodel"]
          settings?: Json | null
          status?: Database["public"]["Enums"]["clientstatus"] | null
          updated_at?: string | null
          vertical: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          mmp_type?: string
          name?: string
          payment_model?: Database["public"]["Enums"]["paymentmodel"]
          settings?: Json | null
          status?: Database["public"]["Enums"]["clientstatus"] | null
          updated_at?: string | null
          vertical?: string
        }
        Relationships: []
      }
      critical_action_rules: {
        Row: {
          action_type: string
          approval_role_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          requires_approval: boolean | null
          resource_type: string | null
          threshold_type: string | null
          threshold_value: number | null
        }
        Insert: {
          action_type: string
          approval_role_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          requires_approval?: boolean | null
          resource_type?: string | null
          threshold_type?: string | null
          threshold_value?: number | null
        }
        Update: {
          action_type?: string
          approval_role_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          requires_approval?: boolean | null
          resource_type?: string | null
          threshold_type?: string | null
          threshold_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "critical_action_rules_approval_role_id_fkey"
            columns: ["approval_role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      embedding_queue: {
        Row: {
          content: string
          created_at: string | null
          error: string | null
          id: string
          priority: number | null
          processed_at: string | null
          record_id: string
          table_name: string
        }
        Insert: {
          content: string
          created_at?: string | null
          error?: string | null
          id?: string
          priority?: number | null
          processed_at?: string | null
          record_id: string
          table_name: string
        }
        Update: {
          content?: string
          created_at?: string | null
          error?: string | null
          id?: string
          priority?: number | null
          processed_at?: string | null
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      graph_checkpoints: {
        Row: {
          checkpoint: Json
          checkpoint_id: string
          checkpoint_ns: string
          created_at: string | null
          graph_id: string
          metadata: Json | null
          parent_checkpoint_id: string | null
          thread_id: string
          thread_ts: string
        }
        Insert: {
          checkpoint: Json
          checkpoint_id: string
          checkpoint_ns?: string
          created_at?: string | null
          graph_id: string
          metadata?: Json | null
          parent_checkpoint_id?: string | null
          thread_id: string
          thread_ts: string
        }
        Update: {
          checkpoint?: Json
          checkpoint_id?: string
          checkpoint_ns?: string
          created_at?: string | null
          graph_id?: string
          metadata?: Json | null
          parent_checkpoint_id?: string | null
          thread_id?: string
          thread_ts?: string
        }
        Relationships: []
      }
      graph_interrupts: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          interrupt_type: string
          node_id: string
          reason: string | null
          request_data: Json
          responded_at: string | null
          response_data: Json | null
          status: string | null
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          interrupt_type: string
          node_id: string
          reason?: string | null
          request_data: Json
          responded_at?: string | null
          response_data?: Json | null
          status?: string | null
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          interrupt_type?: string
          node_id?: string
          reason?: string | null
          request_data?: Json
          responded_at?: string | null
          response_data?: Json | null
          status?: string | null
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "graph_interrupts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "chat_threads"
            referencedColumns: ["thread_id"]
          },
          {
            foreignKeyName: "graph_interrupts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "graph_threads"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      graph_threads: {
        Row: {
          approval_data: Json | null
          completed_at: string | null
          context: Json | null
          created_at: string | null
          id: string
          requires_approval: boolean | null
          status: string | null
          thread_id: string
          thread_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          approval_data?: Json | null
          completed_at?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          requires_approval?: boolean | null
          status?: string | null
          thread_id: string
          thread_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          approval_data?: Json | null
          completed_at?: string | null
          context?: Json | null
          created_at?: string | null
          id?: string
          requires_approval?: boolean | null
          status?: string | null
          thread_id?: string
          thread_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      langgraph_checkpoints: {
        Row: {
          channel_values: Json
          channel_versions: Json
          checkpoint_id: string
          created_at: string | null
          metadata: Json
          parent_id: string | null
          thread_id: string
        }
        Insert: {
          channel_values: Json
          channel_versions: Json
          checkpoint_id: string
          created_at?: string | null
          metadata?: Json
          parent_id?: string | null
          thread_id: string
        }
        Update: {
          channel_values?: Json
          channel_versions?: Json
          checkpoint_id?: string
          created_at?: string | null
          metadata?: Json
          parent_id?: string | null
          thread_id?: string
        }
        Relationships: []
      }
      langgraph_writes: {
        Row: {
          channel: string
          checkpoint_id: string
          created_at: string | null
          task_id: string
          thread_id: string
          value: Json | null
        }
        Insert: {
          channel: string
          checkpoint_id: string
          created_at?: string | null
          task_id: string
          thread_id: string
          value?: Json | null
        }
        Update: {
          channel?: string
          checkpoint_id?: string
          created_at?: string | null
          task_id?: string
          thread_id?: string
          value?: Json | null
        }
        Relationships: []
      }
      langraph_store_items: {
        Row: {
          created_at: string | null
          embedding: string | null
          key: string
          namespace: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          embedding?: string | null
          key: string
          namespace: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          embedding?: string | null
          key?: string
          namespace?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      matched_stats: {
        Row: {
          ad_id: string | null
          adset_id: string | null
          campaign_id: string
          clicks: number | null
          client_id: string
          cpa_event_a: number | null
          cpi: number | null
          cr_event_a_to_installs: number | null
          cr_installs_to_clicks: number | null
          created_at: string | null
          ctr: number | null
          date: string
          event_a_count: number | null
          event_b_count: number | null
          id: number
          impressions: number | null
          installs: number | null
          profit: number | null
          revenue: number | null
          roi: number | null
          spend: number | null
          updated_at: string | null
        }
        Insert: {
          ad_id?: string | null
          adset_id?: string | null
          campaign_id: string
          clicks?: number | null
          client_id: string
          cpa_event_a?: number | null
          cpi?: number | null
          cr_event_a_to_installs?: number | null
          cr_installs_to_clicks?: number | null
          created_at?: string | null
          ctr?: number | null
          date: string
          event_a_count?: number | null
          event_b_count?: number | null
          id?: number
          impressions?: number | null
          installs?: number | null
          profit?: number | null
          revenue?: number | null
          roi?: number | null
          spend?: number | null
          updated_at?: string | null
        }
        Update: {
          ad_id?: string | null
          adset_id?: string | null
          campaign_id?: string
          clicks?: number | null
          client_id?: string
          cpa_event_a?: number | null
          cpi?: number | null
          cr_event_a_to_installs?: number | null
          cr_installs_to_clicks?: number | null
          created_at?: string | null
          ctr?: number | null
          date?: string
          event_a_count?: number | null
          event_b_count?: number | null
          id?: number
          impressions?: number | null
          installs?: number | null
          profit?: number | null
          revenue?: number | null
          roi?: number | null
          spend?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matched_stats_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matched_stats_adset_id_fkey"
            columns: ["adset_id"]
            isOneToOne: false
            referencedRelation: "ad_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matched_stats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matched_stats_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          applied_at: string
          filename: string
          id: number
        }
        Insert: {
          applied_at?: string
          filename: string
          id?: number
        }
        Update: {
          applied_at?: string
          filename?: string
          id?: number
        }
        Relationships: []
      }
      mintegral_stats_cache: {
        Row: {
          campaign_external_id: string
          created_at: string | null
          date: string
          id: string
          is_final: boolean | null
          stats_data: Json
          updated_at: string | null
        }
        Insert: {
          campaign_external_id: string
          created_at?: string | null
          date: string
          id?: string
          is_final?: boolean | null
          stats_data: Json
          updated_at?: string | null
        }
        Update: {
          campaign_external_id?: string
          created_at?: string | null
          date?: string
          id?: string
          is_final?: boolean | null
          stats_data?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          resource?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      raw_stats: {
        Row: {
          created_at: string | null
          data: Json
          id: number
          platform: string
          report_date: string
          request_params: Json | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          id?: number
          platform: string
          report_date: string
          request_params?: Json | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          id?: number
          platform?: string
          report_date?: string
          request_params?: Json | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          conditions: Json | null
          granted_at: string | null
          granted_by: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          conditions?: Json | null
          granted_at?: string | null
          granted_by?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          conditions?: Json | null
          granted_at?: string | null
          granted_by?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          name: string
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          name: string
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          name?: string
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          client_id: string
          created_at: string | null
          credentials: Json
          id: string
          is_active: boolean | null
          name: string
          platform: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          credentials: Json
          id?: string
          is_active?: boolean | null
          name: string
          platform: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          credentials?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          platform?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sources_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_permissions: {
        Row: {
          can_execute: boolean | null
          conditions: Json | null
          id: string
          max_daily_calls: number | null
          role_id: string | null
          tool_name: string
        }
        Insert: {
          can_execute?: boolean | null
          conditions?: Json | null
          id?: string
          max_daily_calls?: number | null
          role_id?: string | null
          tool_name: string
        }
        Update: {
          can_execute?: boolean | null
          conditions?: Json | null
          id?: string
          max_daily_calls?: number | null
          role_id?: string | null
          tool_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          expires_at: string | null
          role_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          role_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          expires_at?: string | null
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      chat_threads: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string | null
          status: string | null
          thread_id: string | null
          thread_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string | null
          status?: string | null
          thread_id?: string | null
          thread_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string | null
          status?: string | null
          thread_id?: string | null
          thread_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      memory_cleanup_jobs: {
        Row: {
          active: boolean | null
          command: string | null
          database: string | null
          jobid: number | null
          jobname: string | null
          nodename: string | null
          nodeport: number | null
          schedule: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          command?: string | null
          database?: string | null
          jobid?: number | null
          jobname?: string | null
          nodename?: string | null
          nodeport?: number | null
          schedule?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_cleanup_expired_memories: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      calculate_revenue: {
        Args: {
          p_payment_model: string
          p_payout_value: number
          p_revshare_percent: number
          p_installs: number
          p_events: Json
          p_event_mapping: Json
          p_spend: number
        }
        Returns: number
      }
      check_api_rate_limit: {
        Args: {
          p_source_type: string
          p_endpoint: string
          p_limit_type: string
          p_limit: number
        }
        Returns: boolean
      }
      check_appsflyer_daily_limit: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      check_conditions_met: {
        Args: { role_conditions: Json; request_conditions: Json }
        Returns: boolean
      }
      check_duplicate_content: {
        Args: {
          content_embedding: string
          target_user_id: string
          duplicate_threshold?: number
        }
        Returns: boolean
      }
      check_user_permission: {
        Args: {
          p_user_id: string
          p_resource: string
          p_action: string
          p_conditions?: Json
        }
        Returns: boolean
      }
      checkpoint_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          operation_type: string
          total_count: number
          active_count: number
          avg_duration_seconds: number
          success_rate: number
        }[]
      }
      clean_old_short_term_memories: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_memory: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_expired_short_term_memory: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_old_checkpoints: {
        Args: Record<PropertyKey, never>
        Returns: {
          deleted_count: number
          operation_type: string
        }[]
      }
      find_relevant_patterns: {
        Args: {
          query_embedding: string
          target_user_id: string
          target_pattern_type?: string
          min_confidence?: number
          max_results?: number
        }
        Returns: {
          id: string
          pattern_type: string
          pattern_name: string
          description: string
          confidence: number
          similarity: number
          usage_count: number
        }[]
      }
      get_active_user_checkpoints: {
        Args: { p_user_id: string }
        Returns: {
          thread_id: string
          checkpoint_id: string
          operation_type: string
          progress: number
          created_at: string
          metadata: Json
        }[]
      }
      get_latest_checkpoint: {
        Args: { p_thread_id: string }
        Returns: {
          checkpoint_id: string
          parent_id: string
          channel_values: Json
          metadata: Json
          created_at: string
        }[]
      }
      get_memory_stats: {
        Args: { p_client_id: string }
        Returns: {
          memory_type: string
          count: number
          avg_confidence: number
          last_updated: string
        }[]
      }
      get_user_highest_role: {
        Args: { p_user_id: string }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      manual_cleanup_all_memory: {
        Args: Record<PropertyKey, never>
        Returns: {
          short_term_deleted: number
          long_term_deactivated: number
          cache_deleted: number
        }[]
      }
      search_similar_episodes: {
        Args: {
          query_embedding: string
          target_user_id: string
          similarity_threshold?: number
          max_results?: number
          time_window_days?: number
        }
        Returns: {
          id: string
          content: string
          summary: string
          similarity: number
          created_at: string
          metadata: Json
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_fact_access: {
        Args: { fact_id: string }
        Returns: undefined
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      adformat: "VIDEO" | "IMAGE" | "CAROUSEL" | "PLAYABLE"
      appstatus: "ACTIVE" | "PAUSED" | "DRAFT"
      budgetmode: "DAILY" | "TOTAL" | "UNLIMITED"
      campaignstatus: "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED"
      clientstatus: "ACTIVE" | "PAUSED" | "SUSPENDED"
      draft_status: "in_progress" | "ready" | "created" | "abandoned"
      messagerole: "USER" | "ASSISTANT" | "SYSTEM"
      paymentmodel: "CPI" | "CPA" | "REVSHARE" | "COMMISSION"
      platform: "IOS" | "ANDROID"
      userrole: "ADMIN" | "MANAGER" | "MEDIA_BUYER" | "ANALYST" | "VIEWER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      adformat: ["VIDEO", "IMAGE", "CAROUSEL", "PLAYABLE"],
      appstatus: ["ACTIVE", "PAUSED", "DRAFT"],
      budgetmode: ["DAILY", "TOTAL", "UNLIMITED"],
      campaignstatus: ["DRAFT", "ACTIVE", "PAUSED", "COMPLETED"],
      clientstatus: ["ACTIVE", "PAUSED", "SUSPENDED"],
      draft_status: ["in_progress", "ready", "created", "abandoned"],
      messagerole: ["USER", "ASSISTANT", "SYSTEM"],
      paymentmodel: ["CPI", "CPA", "REVSHARE", "COMMISSION"],
      platform: ["IOS", "ANDROID"],
      userrole: ["ADMIN", "MANAGER", "MEDIA_BUYER", "ANALYST", "VIEWER"],
    },
  },
} as const
