// sidebar nav links
export default {
	category1: [
		{
			"menu_title": "sidebar.home",
			"menu_icon": "zmdi zmdi-home",
			"path": "/app/calendar/basic",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.employees",
			"menu_icon": "zmdi zmdi-accounts",
			"child_routes": [
				{
					"path": "/app/tables/data-table",
					"menu_title": "sidebar.employees.seeAll"
				},
				{
					"path": "/app/tables/data-table",
					"menu_title": "sidebar.employees.addNew"
				}
			]
		},
		{
			"menu_title": "sidebar.department",
			"menu_icon": "zmdi zmdi-card-travel",
			"path": "/app/tables/department",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.award",
			"menu_icon": "zmdi zmdi-card-giftcard",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.expense",
			"menu_icon": "zmdi zmdi-money-box",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.holidays",
			"menu_icon": "zmdi zmdi-flight-takeoff",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.attendance",
			"menu_icon": "zmdi zmdi-account",
			"child_routes": [
				{
					"menu_title": "sidebar.level1",
					"child_routes": [
						{
							"path": "/app/level2",
							"menu_title": "sidebar.level2"
						}
					]
				}
			]
		},
		{
			"menu_title": "sidebar.liveCompany",
			"menu_icon": "zmdi zmdi-walk",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.noticeBoard",
			"menu_icon": "zmdi zmdi-collection-text",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "sidebar.settings",
			"menu_icon": "zmdi zmdi-settings",
			"child_routes": [
				{
					"path": "/app/forms/company-info",
					"menu_title": "sidebar.companyInfo"
				},
				{
					"path": "/app/forms/profile-info",
					"menu_title": "sidebar.profileInfo"
				}
			]
		}
	]
}
