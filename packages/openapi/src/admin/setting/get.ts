import type { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { axios } from '../../axios';
import { registerRoute } from '../../utils';
import { aiConfigSchema } from './update';

export const settingVoSchema = z.object({
  instanceId: z.string(),
  disallowSignUp: z.boolean().nullable(),
  disallowSpaceCreation: z.boolean().nullable(),
  disallowSpaceInvitation: z.boolean().nullable(),
  aiConfig: aiConfigSchema.nullable(),
});

export type ISettingVo = z.infer<typeof settingVoSchema>;

export const GET_SETTING = '/admin/setting';

export const GetSettingRoute: RouteConfig = registerRoute({
  method: 'get',
  path: GET_SETTING,
  description: 'Get the instance settings',
  request: {},
  responses: {
    200: {
      description: 'Returns the instance settings.',
      content: {
        'application/json': {
          schema: settingVoSchema,
        },
      },
    },
  },
  tags: ['admin'],
});

export const getSetting = async () => {
  return axios.get<ISettingVo>(GET_SETTING);
};

const publicAiConfigSchema = z.object({
  enable: z.boolean(),
});

export const publicSettingVoSchema = z.object({
  aiConfig: publicAiConfigSchema.nullable(),
});
export type IPublicSettingVo = z.infer<typeof publicSettingVoSchema>;

export const GET_PUBLIC_SETTING = '/admin/setting/public';
export const GetPublicSettingRoute: RouteConfig = registerRoute({
  method: 'get',
  path: GET_PUBLIC_SETTING,
  description: 'Get the public instance settings',
  request: {},
  responses: {
    200: {
      description: 'Returns the public instance settings.',
      content: {
        'application/json': {
          schema: publicSettingVoSchema,
        },
      },
    },
  },
});

export const getPublicSetting = async () => {
  return axios.get<IPublicSettingVo>(GET_PUBLIC_SETTING);
};
