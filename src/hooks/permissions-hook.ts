import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { yearGeneralApi } from "api/general/year-general-api";
import { programProjectApi } from "api/project/programs-project-api";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { accessNamesConfig } from "config/access-names-config";
import {
  budgetAnalyzeKindItems,
  budgetKindItems,
  budgetMethodItems,
  budgetReportItems,
  centerItems,
  organItems,
  organItems2,
  trazKindItems,
} from "config/features/general-fields-config";
import { sidenavsLayout } from "config/features/layout-config";
import { getPermissionWithLevel } from "helper/auth-utils";
import { AccessItemShape } from "types/access-type";
import { SidenavShape } from "types/layout-type";

function usePermissions() {
  const formatApiFields = (
    label: string,
    name: string,
    labelFieldName: string,
    values: any[]
  ) => {
    return {
      label,
      name,
      value: values.map((item) => ({
        label: item[labelFieldName],
        name: item.id,
      })),
    };
  };

  const formatLocalFields: any = (label: string, name: string, values: any) => {
    return {
      label,
      name,
      ...(Array.isArray(values) && {
        value: values.map((item: any) =>
          formatLocalFields(item.label, item.name || item.value, item.value)
        ),
      }),
      // value: values.map((item: any) => ({
      //   label: item.label,
      //   name: item.value,
      // })),
    };
  };

  //   year
  const yearLevel1Query = useQuery(["general-year", 1], () =>
    yearGeneralApi.getData(1)
  );

  const yearLevel2Query = useQuery(["general-year", 2], () =>
    yearGeneralApi.getData(2)
  );

  const yearLevel1Field: AccessItemShape = formatApiFields(
    "سال",
    accessNamesConfig.FIELD_YEAR,
    "yearName",
    yearLevel1Query.data?.data || []
  );

  const yearLevel2Field: AccessItemShape = formatApiFields(
    "سال",
    accessNamesConfig.FIELD_YEAR,
    "yearName",
    yearLevel2Query.data?.data || []
  );

  // proctor
  const proctorQuery = useQuery(["general-proctor-list"], () =>
    abstructProctorApi.getProctorList()
  );
  const proctorField: AccessItemShape = formatApiFields(
    "متولی",
    accessNamesConfig.FIELD_PROCTOR,
    "proctorName",
    proctorQuery.data?.data || []
  );

  // program
  const programProjectQuery = useQuery(["program-list"], () =>
    programProjectApi.getProgramList()
  );

  const programProjectField: AccessItemShape = formatApiFields(
    "برنامه",
    accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
    "programName",
    programProjectQuery.data?.data || []
  );
  
  const kindIdField = formatLocalFields(
      "نوع",
      accessNamesConfig.FIELD_KIND_ID,
      budgetAnalyzeKindItems
  );

  // organ
  const organField = formatLocalFields(
    "سازمان",
    accessNamesConfig.FIELD_ORGAN,
    organItems
  );

  const organField2 = formatLocalFields(
    "سازمان",
    accessNamesConfig.FIELD_ORGAN,
    organItems2
  );

  //   budget method
  const budgetMethodField = formatLocalFields(
    "نوع بودجه",
    accessNamesConfig.FIELD_BUDGET_METHOD,
    budgetMethodItems
  );

  const budgetField = formatLocalFields(
    "نوع گزارش",
    accessNamesConfig.BUDGET__REPORT_PAGE_COMBO,
    budgetReportItems
  );

  //   budget kind
  const budgetKindField = formatLocalFields(
    "نوع فرایند",
    accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
    budgetKindItems
  );
  
  //   budget kind
  const budgetAnalyzeKindField = formatLocalFields(
    "نوع فرایند",
    accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
      budgetAnalyzeKindItems
  );

  // traz type
  const trazKindField = formatLocalFields(
    "نوع تراز",
    accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND,
    trazKindItems
  );

  // center
  const centerField = formatLocalFields(
    "مرکز",
    accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER,
    centerItems
  );

  //   area
  const areaNumber2Query = useQuery(["general-area", 2], () =>
    areaGeneralApi.getData(2)
  );

  const areaNumber1Query = useQuery(["general-area", 1], () =>
    areaGeneralApi.getData(1)
  );

  const areaNumber3Query = useQuery(["general-area", 3], () =>
    areaGeneralApi.getData(3)
  );

  const areaNumber1Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber1Query.data?.data || []
  );

  const areaNumber2Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber2Query.data?.data || []
  );

  const areaNumber3Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber3Query.data?.data || []
  );
  
  const budgetReportPageProjectScaleActions: AccessItemShape = formatLocalFields(
      "مشاهده جزئیات ردیف",
      accessNamesConfig.PROJECT__SCALE_ACTIONS,
  );

  // seprator
  const sepratorTaminBtn = formatLocalFields(
    "دکمه تامین اعتبار",
    accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
    [
      formatLocalFields(
        "دکمه تامین اعتبار مودال",
        accessNamesConfig.BUDGET__SEPRATOR_PAGE_INNER_TAMIN_BTN
      ),
    ]
  );

  const sepratorProjectBtn = formatLocalFields(
    "دکمه پروژه",
    accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN,
    [
      formatLocalFields(
        "دکمه جستجوی پروژه",
        accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_SEARCH_BTN
      ),

      formatLocalFields(
        "دکمه مجری",
        accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_BTN,
        [
          formatLocalFields(
            "دکمه لیست مجریان",
            accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_ADD_BTN
          ),
          formatLocalFields(
            "دکمه ویرایش مجریان",
            accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_EDIT_BTN
          ),
          formatLocalFields(
            "دکمه حذف مجریان",
            accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_DELETE_BTN
          ),
        ]
      ),

      formatLocalFields(
        "دکمه ویرایش کدینگ",
        accessNamesConfig.BUDGET__SEPRATOR_PAGE_EDIT_CODING_BTN
      ),
    ]
  );

  const accessValues = {
    // propsal
    [accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND]: formatLocalFields(
      "روند",
      accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
      [areaNumber3Field, budgetMethodField]
    ),
    [accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE]: formatLocalFields(
      "عملکرد",
      accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
      [
        yearLevel1Field,
        budgetMethodField,
        centerField,
        organField,
        {
          label: "دکمه مقادیر",
          name: accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE_DETAIL,
        },
        {
          label: "دکمه تفکیک درآمد",
          name: accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE_SEP_DETAIL,
        },
      ]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN]: formatLocalFields(
      "عملکرد ماهیانه",
      accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
      [
        yearLevel1Field,
        organField2,
        formatApiFields(
          "اکسل",
          accessNamesConfig.FIELD_AREA,
          "areaName",
          areaNumber3Query.data?.data || []
        ),
        formatLocalFields(
          "اکسل کف",
          accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN_BASE_EXCEL
        ),
      ]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT]: formatLocalFields(
      "متولی",
      accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
      [
        yearLevel1Field,
        formatLocalFields(
          "دکمه درخواست ت اعتبار",
          accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
          [areaNumber2Field, proctorField]
        ),
      ]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY]: formatLocalFields(
      "خلاصه بودجه",
      accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
      [yearLevel1Field]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION]: formatLocalFields(
      "انحراف بودجه",
      accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
      [yearLevel1Field, areaNumber3Field]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT]: formatLocalFields(
      "سهم ردیف های بودجه",
      accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
      [yearLevel1Field, areaNumber3Field]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE]: formatLocalFields(
      "مقیاس پروژه",
      accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
      [yearLevel1Field, areaNumber3Field, budgetReportPageProjectScaleActions]
    ),
  
    [accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE]: formatLocalFields(
        "تامین اعتبار",
        accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
        [areaNumber1Field, kindIdField]
    ),

    // transfer page

    [accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_ROW]: {
      label: "دکمه حذف ردیف",
      name: accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_ROW,
    },

    [accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_CODE]: {
      label: "دکمه حذف کد حسابداری",
      name: accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_CODE,
    },

    [accessNamesConfig.FINANCIAL__CODING_PAGE_ADD]: {
      label: "دکمه افزودن",
      name: accessNamesConfig.FINANCIAL__CODING_PAGE_ADD,
    },

    [accessNamesConfig.FINANCIAL__CODING_PAGE_BALANCE]: {
      label: "دکمه ترازو",
      name: accessNamesConfig.FINANCIAL__CODING_PAGE_BALANCE,
    },

    // abstruct
    [accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND]:
      budgetKindField,

    [accessNamesConfig.BUDGET__REPORT_PAGE_COMBO]: budgetField,
    // seprator
    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN]: {
    //   label: "دکمه تامین اعتبار",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
    // },

    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN]: sepratorTaminBtn,
    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN]: sepratorProjectBtn,

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_INNER_TAMIN_BTN]: {
    //   label: "دکمه تامین اعتبار مودال",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_INNER_TAMIN_BTN,
    // },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN]: {
    //   label: "دکمه پروژه",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN,
    // },

    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_ACC_BTN]: {
      label: "دکمه حسابداری",
      name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_ACC_BTN,
    },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_BTN]: {
    //   label: "دکمه مجری",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_BTN,
    // },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_SEARCH_BTN]: {
    //   label: "دکمه جستجوی پروژه",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_SEARCH_BTN,
    // },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_ADD_BTN]: {
    //   label: "دکمه لیست مجریان",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_ADD_BTN,
    // },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_EDIT_BTN]: {
    //   label: "دکمه ویرایش مجریان",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_EDIT_BTN,
    // },

    // [accessNamesConfig.BUDGET__SEPRATOR_PAGE_EDIT_CODING_BTN]: {
    //   label: "دکمه ویرایش کدینگ",
    //   name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_EDIT_CODING_BTN,
    // },

    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_CODE]: {
      label: "دکمه کد",
      name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_CODE,
    },

    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB]: {
      label: "دکمه مصوب",
      name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB,
    },
  
    [accessNamesConfig.BUDGET__PROPOSAL_EDIT_BUTTON]: {
      label: "دکمه ویرایش",
      name: accessNamesConfig.BUDGET__PROPOSAL_EDIT_BUTTON,
    },
    
    [accessNamesConfig.BUDGET__PROPOSAL_DATA_TABLE_READ]: {
      label: "جزئیات ردیف",
      name: accessNamesConfig.BUDGET__PROPOSAL_DATA_TABLE_READ,
    },
    
    [accessNamesConfig.BUDGET__PROPOSAL_DATA_TABLE_CHART]: {
      label: "مشاهده جدول",
      name: accessNamesConfig.BUDGET__PROPOSAL_DATA_TABLE_CHART,
    },

    // report

    [accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER]: centerField,

    [accessNamesConfig.FIELD_ORGAN]: organField,
    [getPermissionWithLevel(accessNamesConfig.FIELD_ORGAN, 2)]: organField2,

    // taraz
    [accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND]: trazKindField,

    // program
    [accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM]: programProjectField,

    // global fileds
    [getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1)]: yearLevel1Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 2)]: yearLevel2Field,

    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 1)]: areaNumber1Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2)]: areaNumber2Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3)]: areaNumber3Field,

    [accessNamesConfig.FIELD_BUDGET_METHOD]: budgetMethodField,
  };

  const getAccessConfig = (items: SidenavShape[]) => {
    let renderedAccessConfig: AccessItemShape[] = [];
    items.forEach((item) => {
      if (!Array.isArray(item.items)) {
        renderedAccessConfig.push({
          label: item.title,
          name: item.licenseName || "1",
          value: [
            ...(item.permissionItems?.map((item) => accessValues[item]) || []),
          ],
        });
      } else {
        renderedAccessConfig = [
          ...renderedAccessConfig,
          ...getAccessConfig(item.items),
        ];
      }
    });

    return renderedAccessConfig;
  };

  const ACCESS_CONFIG: AccessItemShape[] = getAccessConfig(sidenavsLayout);

  return {
    loading:
      yearLevel1Query.isLoading ||
      areaNumber2Query.isLoading ||
      yearLevel2Query.isLoading ||
      areaNumber1Query.isLoading,
    data: ACCESS_CONFIG,
  };
}

export default usePermissions;
