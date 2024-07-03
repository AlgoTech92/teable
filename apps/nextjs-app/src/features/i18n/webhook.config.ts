import type { I18nActiveNamespaces } from '@/lib/i18n';

export interface IWebhookConfig {
  i18nNamespaces: I18nActiveNamespaces<'common' | 'sdk' | 'webhook'>;
}

export const webhookConfig: IWebhookConfig = {
  i18nNamespaces: ['common', 'sdk', 'webhook'],
};
