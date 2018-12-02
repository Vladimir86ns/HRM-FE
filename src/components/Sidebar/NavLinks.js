// sidebar nav links
export default {
	category1: [
		{
			"menu_title": "Home",
			"menu_icon": "zmdi zmdi-home",
			"path": "/app/calendar/basic",
			"child_routes": null
		},
		{
			"menu_title": "Employees",
			"menu_icon": "zmdi zmdi-accounts",
			"path": "/app/users/user-management",
			"child_routes": null
		},
		{
			"menu_title": "Department",
			"menu_icon": "zmdi zmdi-card-travel",
			"path": "/app/tables/department",
			"child_routes": null
		},
		{
			"menu_title": "Award",
			"menu_icon": "zmdi zmdi-card-giftcard",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "Expense",
			"menu_icon": "zmdi zmdi-money-box",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "Holidays",
			"menu_icon": "zmdi zmdi-flight-takeoff",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "Attendance",
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
			"menu_title": "Leave Company",
			"menu_icon": "zmdi zmdi-walk",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "Notice Board",
			"menu_icon": "zmdi zmdi-collection-text",
			"path": "/horizontal/mail",
			"child_routes": null
		},
		{
			"menu_title": "Settings",
			"menu_icon": "zmdi zmdi-settings",
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
	]
}
