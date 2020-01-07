const {
  OptionQueries,
  WorkflowControlTypes,
  RefQueries,
  MutationQueries,
  WorkflowControllAccessModes,
} = require('./constants');

/**
 * Validation only have in objects
 * which has workflowControlType
 * Please do not touch to anything else. Thank you!
 *
 * validation object
 * {
 *    required: [boolean],
 *    email: [boolean],
 *    noSpecialChar: [boolean][Does not contain special characters ~ * % } : > / # & { \ < ?|],
 *    edmsUrl: [string][Valid format staring with http://edmsr.gic.com.sg]
 *    // please add more if missing
 * }
 *
 * Put validation object inside config object
 * [example]: {
 *    config: {
 *      validation: {
 *        min: 0,
 *      }
 *    }
 * }
 *
 * missing:
 * Investment currency
 */

module.exports.investments = [
  {
    displayName: 'General',
    name: 'general',
    children: [
      {
        displayName: 'General',
        name: 'general',
        children: [
          {
            displayName: 'Investment ID',
            name: 'id',
            workflowControlType: WorkflowControlTypes.Label,
            config: { validation: ['required'] },
          },
          {
            displayName: 'SPIRE Investment ID',
            name: 'sPIREInvestmentId',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            displayName: 'Investment Name',
            name: 'name',
            workflowControlType: WorkflowControlTypes.Text,
            config: { validation: ['required', 'noSpecialChar'] },
          },
          {
            displayName: 'Investment Currency',
            name: 'investmentCurrency',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              width: 'medium',
              query: OptionQueries.QueryCurrencyOptionsDocument,
              transform: ['transformGraphqlObject'],
              validation: ['object', 'required'],
              appendExtraLabel: 'description',
            },
          },
          {
            displayName: 'Investment Type',
            name: 'refInvestmentType',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              width: 'medium',
              transform: ['transformGraphqlObject'],
              validation: ['object', 'required'],
              query: OptionQueries.QueryInvestmentTypeOptionsDocument,
            },
          },
          {
            displayName: 'Is CI Fund',
            name: 'isCIFund',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              validation: ['boolean'],
              defaultValue: false,
              appearanceRules: [
                {
                  name: 'showForCI',
                  rule: 'refInvestmentType.name',
                },
              ],
            },
          },
          {
            displayName: 'Business Group',
            name: 'refStrategy.parent.name',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            isInBulk: true,
            displayName: 'Strategy',
            name: 'refStrategy',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryStrategyOptionsDocument,
              width: 'medium',
              transform: ['transformGraphqlObject'],
              validation: ['object', 'required'],
              variables: { isGetParentOnly: false },
            },
          },
          {
            displayName: 'Lead Division',
            name: 'subDivision.parent.name',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            displayName: 'Sub Division',
            name: 'subDivision',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryDivisionOptionsDocument,
              width: 'medium',
              transform: ['transformGraphqlObject'],
              additionalInfo: 'This is explaination of field',
              validation: ['object', 'required'],
              variables: { isGetParentOnly: false },
              appendExtraLabel: 'parent.name',
            },
          },
          {
            displayName: 'Sector',
            name: 'subSector.parent.name',
            workflowControlType: WorkflowControlTypes.Label,
            isInBulk: true,
          },
          {
            displayName: 'Sub Sector',
            name: 'subSector',
            workflowControlType: WorkflowControlTypes.Select,
            isInBulk: true,
            config: {
              query: OptionQueries.QuerySectorOptionsDocument,
              width: 'medium',
              validation: ['object', 'required'],
              transform: ['transformGraphqlObject'],
              variables: { isGetParentOnly: false },
              appendExtraLabel: 'parent.name',
            },
          },
          {
            displayName: 'Sub Sector (INFRA at IC)',
            name: 'subSectorINFRA',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QuerySectorOptionsDocument,
              width: 'medium',
              validation: ['object', 'required'],
              transform: ['transformGraphqlObject'],
              variables: { isGetParentOnly: false },
              appendExtraLabel: 'parent.name',
            },
          },
          {
            isInBulk: true,
            displayName: 'Investment Theme',
            name: 'refInvestmentTheme',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryInvestmentThemeOptionsDocument,
              width: 'medium',
              validation: [
                'object',
                {
                  name: 'requiredFor',
                  rule: [
                    'subDivision.parent.name',
                    'tig',
                    'infra',
                    'infra debt',
                    'isg',
                  ],
                },
              ],
              transform: ['transformGraphqlObject'],
              isClearable: true,
            },
          },
          {
            isInBulk: true,
            displayName: 'Investment Group',
            name: 'investmentGroup',
            workflowControlType: WorkflowControlTypes.Text,
            config: {
              width: 'medium',
            },
          },
          {
            isInBulk: true,
            displayName: 'Vintage Year (FY)',
            name: 'vintageYearFY',
            workflowControlType: WorkflowControlTypes.Date,
            config: {
              format: 'YYYY/YYYY',
              width: 'medium',
              validation: [{ name: 'format', rule: 'YYYY/YYYY' }],
              isClearable: true,
            },
          },
          {
            isInBulk: true,
            displayName: 'Vintage Year (CY)',
            name: 'vintageYearCY',
            workflowControlType: WorkflowControlTypes.Date,
            config: {
              format: 'YYYY',
              width: 'medium',
              validation: [{ name: 'format', rule: 'YYYY' }],
              isClearable: true,
            },
          },
          {
            displayName: 'Listed At Entry ',
            name: 'listedAtEntry',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              defaultValue: false,
            },
          },
          {
            displayName: 'Stapled Primary',
            name: 'stapledPrimary',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              width: 'medium',
              onlyGetSelectValue: true,
              transform: ['transformSelectObject'],
              validation: ['string'],
              options: [
                {
                  value: 'No',
                  label: 'No',
                },
                {
                  value: 'Yes',
                  label: 'Yes',
                },
              ],
              isClearable: true,
            },
          },
          {
            displayName: 'ISG Deal Classification',
            name: 'refISGDealClassification',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryIsgDealClassificationOptionsDocument,
              width: 'medium',
              validation: [
                'object',
                {
                  name: 'requiredFor',
                  rule: ['subDivision.parent.name', 'isg'],
                },
              ],
              transform: ['transformGraphqlObject'],
              isClearable: true,
            },
          },
          {
            displayName: 'ISG Segment',
            name: 'refISGSegment',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryIsgSegmentOptionsDocument,
              width: 'medium',
              validation: [
                'object',
                {
                  name: 'requiredFor',
                  rule: ['subDivision.parent.name', 'isg'],
                },
              ],
              transform: ['transformGraphqlObject'],
              isClearable: true,
            },
          },
          {
            displayName: 'Management Fee',
            name: 'managementFeeStructure',
            workflowControlType: WorkflowControlTypes.Textarea,
            config: {
              width: 'medium',
            },
          },
          {
            displayName: 'Commitment inclusive of Management Fee',
            name: 'commitmentInclusiveOfManagementFee',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              defaultValue: false,
            },
          },
          {
            displayName: 'Commitment inclusive of Partnership Fee',
            name: 'commitmentInclusiveOfPartnershipFee',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              defaultValue: false,
            },
          },
          {
            isInBulk: true,
            displayName: 'GISR Risk Rating - Current',
            name: 'refCurrentRiskRating',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryRiskRatingOptionsDocument,
              width: 'medium',
              disabled: ['disableForCIDI'],
              validation: ['object', 'requiredForDICI'],
              transform: ['transformGraphqlObject'],
            },
          },
          {
            displayName: 'GISR Risk Rating at IC',
            name: 'refRiskRatingAtIC',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              width: 'medium',
              query: OptionQueries.QueryRiskRatingOptionsDocument,
              disabled: ['disableForCIDI'],
              validation: ['object', 'requiredForDICI'],
              transform: ['transformGraphqlObject'],
            },
          },
          {
            isInBulk: true,
            name: 'investmentCRPs',
            displayName: 'Investment CRPs',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: ['array', 'requiredForDICI'],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Company',
    name: 'companyTab',
    config: {
      appearanceRules: [
        {
          name: 'hideIfHasValue',
          rule: 'targetInvesteeFund',
        },
      ],
    },
    children: [
      {
        displayName: 'Company',
        name: 'company',
        children: [
          {
            name: 'company',
            displayName: 'Company',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: [
                'object',
                {
                  name: 'companyOrFundRequired',
                  rule: 'targetInvesteeFund',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Fund',
    name: 'targetInvesteeFundTab',
    config: {
      appearanceRules: [
        {
          name: 'hideIfHasValue',
          rule: 'company',
        },
      ],
    },
    children: [
      {
        displayName: 'Fund',
        name: 'targetInvesteeFund',
        children: [
          {
            name: 'targetInvesteeFund',
            displayName: 'Fund',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              linkedTo: { name: 'fundManager', valuePath: 'fundManager' },
              validation: [
                'object',
                {
                  name: 'companyOrFundRequired',
                  rule: 'company',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Fund Manager',
    name: 'fundManagerTab',
    config: {
      appearanceRules: [
        {
          name: 'showForDICI',
          rule: 'refInvestmentType.name',
        },
      ],
    },
    children: [
      {
        displayName: 'Fund Manager',
        name: 'fundManager',
        children: [
          {
            name: 'fundManager',
            displayName: 'Fund Manager',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              appearanceRules: [
                {
                  name: 'disableIfHasValue',
                  rule: 'targetInvesteeFund.fundManager.id',
                },
                {
                  name: 'showForDICI',
                  rule: 'refInvestmentType.name',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Commitments',
    name: 'commitments',
    children: [
      {
        displayName: 'Commitments',
        name: 'commitments',
        children: [
          {
            name: 'commitments',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: [
                'array',
                'required',
                {
                  name: 'shouldNotSameDate',
                  rule: 'approvedCommitmentDate',
                },
              ],
            },
          },
        ],
      },
    ],
  },

  {
    name: 'doubleBookings',
    displayName: 'Double Bookings',
    children: [
      {
        displayName: 'Double Bookings',
        name: 'doubleBookings',
        children: [
          {
            name: 'doubleBookings',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: [
                'array',
                'doubleBookingsSubDivisionValidation',
                {
                  name: 'noDuplicateRecord',
                  rule: 'refSubDivision.id',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    name: 'coInvestingFunds',
    displayName: 'Co-Investing Funds',
    children: [
      {
        displayName: 'Co-Investing Funds',
        name: 'coInvestingFunds',
        children: [
          {
            name: 'coInvestingFunds',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
            isInBulk: true,
            config: {
              validation: [
                'array',
                {
                  name: 'noDuplicateRecord',
                  rule: 'fund.compassEntity.id',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Team Members',
    name: 'investmentMembers',
    children: [
      {
        displayName: 'Team Members',
        name: 'investmentMembers',
        children: [
          {
            isInBulk: true,
            name: 'investmentMembers',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: [
                'array',
                { name: 'required', rule: 'teamMembersRequired' },
                { name: 'teamMemberRolesValidation', rule: 'current oic,current 2ic' },
                'teamMemberValidation',
                'teamMemberActiveRoleValidation',
              ],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Monitoring',
    name: 'monitoring',
    children: [
      {
        displayName: 'Monitoring',
        name: 'monitoring',
        children: [
          {
            name: 'coreSponsorPercentage',
            displayName: 'Core Sponsor',
            workflowControlType: WorkflowControlTypes.Number,
            config: {
              elemAfterInput: '%',
              validation: [
                'number',
                { name: 'min', rule: 0 },
                { name: 'max', rule: 100 },
                { name: 'decimalPlace', rule: 2 },
              ],
            },
          },
          {
            name: 'nonCoreSponsorPercentage',
            displayName: 'Non Core Sponsor',
            workflowControlType: WorkflowControlTypes.Number,
            config: {
              elemAfterInput: '%',
              validation: [
                'number',
                { name: 'min', rule: 0 },
                { name: 'max', rule: 100 },
                { name: 'decimalPlace', rule: 2 },
              ],
            },
          },
          {
            name: 'coreSponsorLess',
            displayName: 'Core Sponsorless',
            workflowControlType: WorkflowControlTypes.Number,
            config: {
              elemAfterInput: '%',
              validation: [
                'number',
                { name: 'min', rule: 0 },
                { name: 'max', rule: 100 },
                { name: 'decimalPlace', rule: 2 },
              ],
            },
          },
          {
            name: 'nonCoreSponsorLess',
            displayName: 'Non Core Sponsorless',
            workflowControlType: WorkflowControlTypes.Number,
            config: {
              elemAfterInput: '%',
              validation: [
                'number',
                { name: 'min', rule: 0 },
                { name: 'max', rule: 100 },
                { name: 'decimalPlace', rule: 2 },
                {
                  name: 'monitoringTotal',
                  rule:
                    'coreSponsorLess,coreSponsorPercentage,nonCoreSponsorPercentage',
                },
              ],
            },
          },
          {
            isInBulk: true,
            name: 'investmentClusters',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
          },
          {
            isInBulk: true,
            name: 'investmentLeverages',
            displayName: 'Investment Leverages',
            workflowControlType: WorkflowControlTypes.Table,
          },
        ],
      },
    ],
  },
  // {
  //   displayName: 'CRPs',
  //   name: 'investmentCRPs',
  //   children: [
  //     {
  //       displayName: 'CRPs',
  //       name: 'investmentCRPs',
  //       children: [
  //         {
  //           isInBulk: true,
  //           name: 'investmentCRPs',
  //           displayName: 'Investment CRPs',
  //           workflowControlType: WorkflowControlTypes.Table,
  //           config: {
  //             validation: ['array', 'requiredForDICI'],
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Leverage',
  //   name: 'leverage',
  //   children: [
  //     {
  //       displayName: 'Leverage',
  //       name: 'leverage',
  //       children: [
  //         {
  //           isInBulk: true,
  //           name: 'investmentLeverages',
  //           displayName: 'Investment Leverages',
  //           workflowControlType: WorkflowControlTypes.Table,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   displayName: 'Rebal Currency',
  //   name: 'rebalCurrency',
  //   children: [
  //     {
  //       displayName: 'Rebal Currency',
  //       name: 'rebalCurrency',
  //       children: [
  //         {
  //           name: 'hedgingCurrencies',
  //           displayName: 'Rebal Currency',
  //           workflowControlType: WorkflowControlTypes.Table,
  //           config: {
  //             validation: [
  //               'array',
  //               // 'hedgingCurrenciesSameDateValidation',
  //               'hedgingCurrenciesValidation',
  //             ],
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Risk Rating',
  //   name: 'riskRating',
  //   children: [
  //     {
  //       displayName: 'Risk Rating',
  //       name: 'riskRating',
  //       children: [
  //         {
  //           name: 'investmentRiskRatings',
  //           displayName: 'Risk Ratings',
  //           workflowControlType: WorkflowControlTypes.Table,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Transfer',
  //   name: 'investmentTransfer',
  //   children: [
  //     {
  //       displayName: 'Transfer',
  //       name: 'investmentTransfer',
  //       children: [
  //         {
  //           displayName: 'Transfer From',
  //           name: 'investmentTransfer.transferFromInvestment.name',
  //           workflowControlType: WorkflowControlTypes.Label,
  //         },
  //         {
  //           displayName: 'Transfer Date',
  //           name: 'investmentTransfer.effectiveDate',
  //           workflowControlType: WorkflowControlTypes.Date,
  //           config: {
  //             width: 'medium',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    displayName: 'Other Details',
    name: 'otherDetails',
    children: [
      {
        displayName: '',
        name: 'investmentTransferSection',
        config: {
          appearanceRules: [
            {
              name: 'showIfHasValue',
              rule: 'investmentTransfer',
            },
          ],
        },
        children: [
          {
            displayName: 'Investment Transfer',
            name: 'investmentTransfer.id',
            workflowControlType: WorkflowControlTypes.Select,
            workflowControllAccessMode: WorkflowControllAccessModes.Hidden,
            config: {
              transform: ['transformOneOneObject'],
            },
          },
          {
            displayName: 'Transfer From',
            name: 'investmentTransfer.transferedFromInvestment.name',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            displayName: 'Transfer Date',
            name: 'investmentTransfer.transferDate',
            workflowControlType: WorkflowControlTypes.Date,
            config: {
              width: 'medium',
              appearanceRules: [
                {
                  name: 'enableIfHasValue',
                  rule: 'investmentTransfer.id',
                },
              ],
            },
          },
        ],
      },
      {
        displayName: '',
        name: 'hedgingCurrenciesSection',
        children: [
          {
            name: 'hedgingCurrencies',
            displayName: 'Rebal Currency',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: ['array', 'hedgingCurrenciesValidation'],
            },
          },
        ],
      },
    ],
  },
];

module.exports.deals = [
  {
    displayName: 'Deal',
    name: 'deal',
    children: [
      {
        displayName: 'Deal',
        name: 'deal',
        children: [
          {
            workflowControlType: WorkflowControlTypes.Label,
            displayName: 'Deal ID',
            name: 'dealID',
            order: 0,
            config: {
              externalLink: 'dealUrl',
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Text,
            displayName: 'Deal Name',
            name: 'name',
            order: 1,
            config: {
              validation: ['required', 'noSpecialChar'],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Text,
            displayName: 'EDMS',
            name: 'eDMS',
            order: 2,
            config: {
              validation: ['edmsUrl'],
              placeholder: 'http://edmsr.gic.com.sg',
              externalLink: 'fromInputValue',
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Checkbox,
            displayName: 'Is Shared Deal',
            name: 'isSharedDeal',
            order: 3,
            config: {
              validation: ['required'],
              defaultValue: false,
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Date,
            displayName: 'Deal Approved Date',
            name: 'approvalDate',
            order: 4,
            config: {
              validation: ['string', 'required'],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Deal Approved Commitment Currency',
            name: 'approvedCommitmentCurrency',
            order: 5,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryCurrencyOptionsDocument,
              isClearable: true,
              appendExtraLabel: 'description',
              validation: ['object', 'required'],
              width: 'medium',
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Number,
            displayName: 'Deal Approved Commitment Amount',
            name: 'approvedCommitmentAmount',
            order: 6,
            config: {
              validation: ['number', 'required', { name: 'decimalPlace', rule: 2 }],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Number,
            displayName: 'Deal Direct Borrowing Amount',
            name: 'directBorrowingAmount',
            order: 7,
            config: {
              validation: ['number', 'required', { name: 'decimalPlace', rule: 2 }],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Number,
            displayName: 'Deal Estimated Carrying Cost Amount',
            name: 'estimatedCarryingCost',
            order: 8,
            config: {
              validation: ['number', 'required', { name: 'decimalPlace', rule: 2 }],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Approving Authority',
            name: 'refApprovingAuthority',
            order: 9,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryRefApprovingAuthorityOptionsDocument,
              isClearable: true,
              width: 'medium',
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Deal Status',
            name: 'refDealpipeStatus',
            order: 10,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryRefDealpipeStatusOptionsDocument,
              isClearable: true,
              width: 'medium',
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Joint With',
            name: 'dealJointWiths',
            order: 6,
            config: {
              transform: [
                {
                  name: 'transformGraphqlArray',
                  fieldName: 'refJointPartnerId',
                },
              ],
              query: OptionQueries.QueryRefJointPartnerOptionsDocument,
              isClearable: true,
              isMulti: true,
            },
          },
        ],
      },
      {
        displayName: 'Secondaries',
        name: 'dealSecondaries',
        children: [
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Secondaries Investment Type',
            name: 'refSecondariesInvestmentType',
            order: 0,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryInvestmentTypeOptionsDocument,
              isClearable: true,
              width: 'medium',
              validation: ['object', 'required'],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Secondaries Group Currency',
            name: 'refSecondariesGroupCurrency',
            order: 1,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryCurrencyOptionsDocument,
              isClearable: true,
              appendExtraLabel: 'description',
              width: 'medium',
              validation: ['object', 'required'],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Secondaries Deal Type',
            name: 'secondariesDealTypes',
            order: 1,
            config: {
              transform: [
                {
                  name: 'transformGraphqlArray',
                  fieldName: 'refSecondariesDealTypeId',
                },
              ],
              query: OptionQueries.QueryRefDealTypeOptionsDocument,
              isClearable: true,
              isMulti: true,
              validation: ['array', 'required'],
            },
          },
          {
            workflowControlType: WorkflowControlTypes.Select,
            displayName: 'Secondaries Fund Manager',
            name: 'refSecondariesFundManager',
            order: 1,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryFundManagerOptionsDocument,
              isClearable: true,
              width: 'medium',
              validation: ['object', 'required'],
            },
          },
        ],
      },
    ],
  },
];

module.exports.entity = [
  {
    displayName: 'Entity',
    name: 'entity',
    children: [
      {
        displayName: 'Entity',
        name: 'entity',
        children: [
          {
            name: 'legalEntityName',
            displayName: 'Legal Entity Name',
            workflowControlType: WorkflowControlTypes.Text,
            config: {
              validation: ['string', 'required'],
              defaultValue: 'New Entity',
            },
          },
          {
            isInBulk: true,
            name: 'countryOfExposure',
            displayName: 'Country Of Exposure',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              validation: ['object', 'required'],
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryCountryOptionsDocument,
              isClearable: true,
              width: 'medium',
              defaultValue: null,
              // appearanceRules: [
              //   {
              //     name: 'disableIfHasValue',
              //     rule: 'gEMSID',
              //   },
              // ],
            },
          },
          {
            isInBulk: true,
            name: 'countryOfExposure.region',
            displayName: 'Region Of Exposure',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            isInBulk: true,
            name: 'countryOfIncorporation',
            displayName: 'Country Of Incorporation',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              validation: ['object', 'required'],
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryCountryOptionsDocument,
              isClearable: true,
              width: 'medium',
              defaultValue: null,
              // appearanceRules: [
              //   {
              //     name: 'disableIfHasValue',
              //     rule: 'gEMSID',
              //   },
              // ],
            },
          },
          {
            name: 'countryOfListing',
            displayName: 'Country Of Listing',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              transform: ['transformGraphqlObject'],
              query: OptionQueries.QueryCountryOptionsDocument,
              isClearable: true,
              width: 'medium',
              validation: [
                {
                  name: 'requiredFor',
                  rule: ['isPublic', 'true'],
                },
              ],
            },
          },
          {
            isInBulk: true,
            name: 'gEMSID',
            displayName: 'GEMS Company ID',
            workflowControlType: WorkflowControlTypes.Label,
          },
          {
            name: 'isPublic',
            displayName: 'Is Public',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              defaultValue: false,
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Industry',
    name: 'industry',
    children: [
      {
        displayName: 'Industry',
        name: 'industry',
        children: [
          {
            isInBulk: true,
            displayName: 'Industry',
            name: 'compassEntityIndustries',
            workflowControlType: WorkflowControlTypes.Table,
            config: {
              validation: ['array', 'requiredForEntityCompany'],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Alias',
    name: 'alias',
    children: [
      {
        displayName: 'Alias',
        name: 'alias',
        children: [
          {
            displayName: 'Alias',
            name: 'compassEntityAliases',
            workflowControlType: WorkflowControlTypes.Table,
          },
        ],
      },
    ],
  },
  {
    displayName: 'Company Details',
    name: 'company',
    children: [
      {
        displayName: 'Company',
        name: 'company',
        children: [
          {
            isInBulk: true,
            name: 'company.companyOwnerships',
            displayName: 'Company Ownerships',
            workflowControlType: WorkflowControlTypes.Table,
          },
        ],
      },
    ],
  },
  {
    displayName: 'Fund Details',
    name: 'fund',
    children: [
      {
        displayName: 'Fund',
        name: 'fund',
        children: [
          {
            name: 'fund.masterFundName',
            displayName: 'Master Fund Name',
            workflowControlType: WorkflowControlTypes.Text,
            config: {
              validation: [
                'string',
                {
                  name: 'requiredBaseOnFields',
                  rule: 'isMasterFund',
                },
              ],
            },
          },
          {
            name: 'fund.isMasterFund',
            displayName: 'Is Master Fund',
            workflowControlType: WorkflowControlTypes.Checkbox,
            config: {
              defaultValue: false,
            },
          },
          {
            name: 'fund.fundSizeAtInception',
            displayName: 'Fund Size at Inception',
            workflowControlType: WorkflowControlTypes.Number,
            config: {
              validation: ['number'],
            },
          },
          {
            name: 'fund.fundManager',
            displayName: 'Fund Fund Manager',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryFundManagerOptionsDocument,
              transform: ['transformGraphqlObject'],
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Fund Manager Details',
    name: 'fundManager',
    children: [
      {
        displayName: 'Fund Manager',
        name: 'fundManager',
        children: [
          {
            name: 'fundManager.fundManagerFamily',
            displayName: 'Fund Manager Family',
            workflowControlType: WorkflowControlTypes.Select,
            config: {
              query: OptionQueries.QueryFundManagerOptionsDocument,
              isClearable: true,
              width: 'medium',
            },
          },
          {
            isInBulk: true,
            name: 'fundManager.fundManagerRankings',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
          },
          {
            isInBulk: true,
            name: 'fundManager.fundManagerCIRatings',
            displayName: '',
            workflowControlType: WorkflowControlTypes.Table,
          },
        ],
      },
    ],
  },
  {
    displayName: 'Fund Manager Family Details',
    name: 'fundManagerFamily',
    children: [
      {
        displayName: 'Fund Manager Family',
        name: 'fundManagerFamily',
        children: [
          {
            name: 'fundManagerFamily.fundManagers',
            displayName: 'Fund Managers',
            workflowControlType: WorkflowControlTypes.Table,
            workflowControllAccessMode: WorkflowControllAccessModes.Disabled,
          },
        ],
      },
    ],
  },
];
