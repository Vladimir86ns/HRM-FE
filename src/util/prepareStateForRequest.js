 /**
   * Format state for create company info request. 
   * 
   * @param {object} state field key name which value need to be updated
   */
export const prepareStateForCreateCompanyInfoRequest = (state) => {
  let {
    account_info,
    company_info,
    location_info,
    department_info
  } = state;

  return {
    account_info: {
      name: account_info.name,
      email: account_info.email,
      account_id: 1
    },
    company_info: [
      {
        company: {
          name: company_info.name,
          email: company_info.email,
          fax_number: company_info.fax_number,
          mobile_phone: company_info.mobile_phone,
          telephone_number: company_info.telephone_number,
          website: company_info.website
        },
        location: {
          country_id: 191,
          region: location_info.region,
          country: location_info.country,
          city: location_info.city,
          zip_code: location_info.zip_code,
          first_address_line: location_info.first_address_line,
          second_address_line: location_info.second_address_line
        },
        department_info: [
          {
            name: department_info.name,
            description: department_info.description
          }
        ]
      }
    ]
  }
}

 /**
   * Format state for update user info request. 
   * 
   * @param {object} state field key name which value need to be updated
   */
  export const prepareStateForUpdateUserInfoRequest = (state) => {
    state.account_id = localStorage.getItem('account_id');
    return state;
  }