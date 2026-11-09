import type { PromptFields } from './model'

export type PromptPreset = {
  id: string
  name: string
  summary: string
  value: PromptFields
}

export function getPromptPresets(language: string): PromptPreset[] {
  if (language.toLowerCase().startsWith('zh'))
    return [
      {
        id: 'product-spec',
        name: '需求梳理',
        summary: '把一个想法整理成目标、范围与验收标准。',
        value: {
          role: '善于澄清问题的产品伙伴',
          objective: '帮我把一个新想法整理为清楚、可讨论的需求说明。',
          audience: '参与这项工作的产品、设计与交付同事',
          context: '我会在对话中补充用户遇到的问题、现有做法和希望改善的体验。',
          constraints: '先确认目标和范围。信息不足时列出待确认问题，不要编造用户反馈或业务数据。',
          outputFormat: '按背景、目标、使用场景、范围、验收标准、待确认问题组织，使用 Markdown。',
          examples: '验收标准应描述在什么情况下，用户可以完成什么操作，以及能看到什么结果。',
          evaluation: '让同事能看懂要解决的问题，并据此讨论优先级和下一步。',
        },
      },
      {
        id: 'release-copilot',
        name: '发布计划',
        summary: '安排上线步骤、检查事项和回退准备。',
        value: {
          role: '做事细致的发布协调伙伴',
          objective: '帮我为一次即将上线的更新制定可执行的发布计划。',
          audience: '参与发布的负责人、测试与支持同事',
          context: '我会提供这次更新的内容、影响范围、计划时间和已知风险。',
          constraints: '区分发布前、发布中和发布后。明确检查条件和回退触发条件；负责人或时间未知时标为待确认。',
          outputFormat: '先概括本次发布，再用表格列出步骤、负责人、完成条件，最后附检查清单与回退方案。',
          examples: '如果关键操作出现异常，说明何时暂停发布、如何通知相关同事，以及如何确认恢复。',
          evaluation: '每一步都有明确行动和检查方式，交接时不需要靠口头补充关键细节。',
        },
      },
      {
        id: 'incident-analyst',
        name: '故障复盘',
        summary: '整理事件经过、影响和后续改进行动。',
        value: {
          role: '客观、关注改进的复盘伙伴',
          objective: '帮我整理一次故障的经过，分析原因，并提出可跟进的改进行动。',
          audience: '参与处理的同事与需要了解影响的负责人',
          context: '我会提供已知时间线、用户影响、处理动作和现有证据。',
          constraints: '区分事实、推测和未知信息，不把时间相关当作因果关系。聚焦流程与系统改进，避免归责个人。',
          outputFormat: '使用事件摘要、影响范围、时间线、原因分析、有效措施、后续行动六个部分。',
          examples: '每项改进行动包含负责人、优先级和验证方式；缺失信息标为待补充。',
          evaluation: '结论能追溯到证据，行动可以验收，也能让未参与处理的同事理解发生了什么。',
        },
      },
    ]

  return [
    {
      id: 'product-spec',
      name: 'Clarify requirements',
      summary: 'Turn an idea into goals, scope and acceptance criteria.',
      value: {
        role: 'A product partner who asks clear questions',
        objective: 'Help me turn a new idea into a clear requirements brief that we can discuss.',
        audience: 'Product, design and delivery colleagues involved in the work',
        context: 'I will describe the user problem, the current approach and the experience we want to improve.',
        constraints:
          'Clarify goals and scope first. List open questions when information is missing; do not invent user feedback or business data.',
        outputFormat:
          'Use Markdown sections for background, goals, scenarios, scope, acceptance criteria and open questions.',
        examples:
          'An acceptance criterion should state the situation, what the user can do and the result they can observe.',
        evaluation: 'Colleagues should understand the problem and be able to discuss priorities and next steps.',
      },
    },
    {
      id: 'release-copilot',
      name: 'Plan a release',
      summary: 'Prepare launch steps, checks and a rollback plan.',
      value: {
        role: 'A careful release planning partner',
        objective: 'Help me create an actionable plan for an upcoming update.',
        audience: 'Release owners, testing colleagues and the support team',
        context: 'I will provide the changes, affected users, planned timing and known risks.',
        constraints:
          'Separate preparation, rollout and follow-up. Define checks and rollback triggers; mark unknown owners or dates as unconfirmed.',
        outputFormat:
          'Start with a release summary, then a table of steps, owners and completion checks, followed by a checklist and rollback plan.',
        examples: 'If a key user action fails, explain when to pause, who to notify and how to verify recovery.',
        evaluation:
          'Each step has a clear action and a way to check it, so the handoff does not depend on verbal explanations.',
      },
    },
    {
      id: 'incident-analyst',
      name: 'Review an incident',
      summary: 'Understand the timeline, impact and follow-up actions.',
      value: {
        role: 'An objective incident review partner focused on improvement',
        objective: 'Help me document an incident, analyze its causes and identify follow-up actions.',
        audience: 'Colleagues who handled the incident and owners who need to understand its impact',
        context: 'I will provide the known timeline, user impact, response actions and available evidence.',
        constraints:
          'Separate facts, hypotheses and unknowns. Do not assume that correlation proves causation. Focus on systems and processes rather than personal blame.',
        outputFormat: 'Use sections for summary, impact, timeline, cause analysis, what helped and follow-up actions.',
        examples: 'Give each action an owner, priority and verification method. Mark missing information as pending.',
        evaluation:
          'Conclusions follow the evidence, actions can be verified and colleagues outside the response can understand what happened.',
      },
    },
  ]
}
