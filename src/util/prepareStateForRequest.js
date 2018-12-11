
 /**
   * Format state for create company settings request. 
   * 
   * @param {object} state field key name which value need to be updated
   */
export const prepareStateForCreateCompanySettingsRequest = (state) => {
  let {
    accountInfo,
    companyInfo,
    locationInfo,
    departmentInfo
  } = state;

  return {
    account_info: {
      name: accountInfo.name,
      email: accountInfo.email,
      account_id: 1
    },
    company_info: [
      {
        company: {
          name: companyInfo.name,
          email: companyInfo.email,
          fax_number: companyInfo.fax_number,
          mobile_phone: companyInfo.mobile_phone,
          telephone_number: companyInfo.telephone_number,
          website: companyInfo.website
        },
        location: {
          country_id: 191,
          region: locationInfo.region,
          country: locationInfo.country,
          city: locationInfo.city,
          zip_code: locationInfo.zip_code,
          first_address_line: locationInfo.first_address_line,
          second_address_line: locationInfo.second_address_line
        },
        department_info: [
          {
            name: departmentInfo.name,
            description: departmentInfo.description
          }
        ]
      }
    ]
  }
}