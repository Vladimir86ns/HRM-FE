// sidebar nav links
export default {
	category1: [
		{
			"menu_title": "sidebar.calendar",
			"menu_icon": "zmdi zmdi-calendar-note",
			"child_routes": [
				{
					"path": "/app/calendar/basic",
					"menu_title": "components.basic"
				},
				{
					"path": "/app/calendar/cultures",
					"menu_title": "sidebar.cultures"
				},
				{
					"path": "/app/calendar/dnd",
					"menu_title": "sidebar.dnd"
				},
				{
					"path": "/app/calendar/selectable",
					"menu_title": "sidebar.selectable"
				},
				{
					"path": "/app/calendar/custom-rendering",
					"menu_title": "sidebar.customRendering"
				}
			]
		},
		{
			"menu_title": "sidebar.maps",
			"menu_icon": "zmdi zmdi-map",
			"child_routes": [
				{
					"path": "/app/maps/google-maps",
					"menu_title": "sidebar.googleMaps"
				},
				{
					"path": "/app/maps/leaflet-maps",
					"menu_title": "sidebar.leafletMaps"
				}
			]
		},
		{
			"menu_title": "sidebar.users",
			"menu_icon": "zmdi zmdi-accounts",
			"child_routes": [
				{
					"path": "/app/users/user-profile-1",
					"menu_title": "sidebar.userProfile1"
				},
				{
					"path": "/app/users/user-profile",
					"menu_title": "sidebar.userProfile2"
				},
				{
					"path": "/app/users/user-management",
					"menu_title": "sidebar.userManagement"
				},
				{
					"path": "/app/users/user-list",
					"menu_title": "sidebar.userList"
				}
			]
		},
		{
			"menu_title": "sidebar.editor",
			"menu_icon": "zmdi zmdi-edit",
			"child_routes": [
				{
					"path": "/app/editor/wysiwyg-editor",
					"menu_title": "sidebar.wysiwygEditor"
				},
				{
					"path": "/app/editor/quill-editor",
					"menu_title": "sidebar.quillEditor"
				}
			]
		},
		{
			"menu_title": "sidebar.dragAndDrop",
			"menu_icon": "zmdi zmdi-mouse",
			"child_routes": [
				{
					"path": "/app/drag-andDrop/react-dragula",
					"menu_title": "sidebar.reactDragula"
				},
				{
					"path": "/app/drag-andDrop/react-dnd",
					"menu_title": "sidebar.reactDnd"
				}
			]
		},
		{
			"menu_title": "sidebar.multiLevel",
			"menu_icon": "zmdi zmdi-view-web",
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
