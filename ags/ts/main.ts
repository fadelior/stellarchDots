//import battery from "types/service/battery"

const battery = await Service.import("battery")

const powerModule = Widget.Label ({
	label: "0"
})

const workspaceModule = Widget.Label ({
	label: "1 2 3 4 5"
})

const windowNameModule = Widget.Label ({
	label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed"
})

const leftBar = Widget.Box ({
	hpack: "start",
	spacing: 8,
	children: [
		powerModule,
		workspaceModule,
		windowNameModule,
	],
})

const mediaModule = Widget.Label ({
	label: "Lorem ipsum - dolor sit amet, consectetur adipiscing elit."
})

const trayModule = Widget.Label ({
	label: "W"
})

const batteryBar = Widget.Label ({
	className: 'batteryLabel' + battery.bind("percent").as((p) => {
		if (battery.charging) {
			return "charging"
		}
		else if (p <= 20) {
			return "critical"
		}
		else {
			return ""
		}
	}),
	label: battery.bind("percent").as((p) => {
		if (p >= 75) {
			return "100"
		}
		else if (p >= 50) {
			return "75"
		}
		else if (p >= 20) {
			return "50"
		}
		else if (p >= 10) {
			return "20"
		}
		else if (p >= 5) {
			return "10"
		}
		else if (p >= 0) {
			return "5"
		}
		else {
			return "0"
		}
	})
})

const systemModule = Widget.Box ({
	hpack: "end",
	children: [
		batteryBar,
		//networkBar,
		//speakerBar,
	]
})

const clockBar = Variable('', {
	poll: [1000, 'date "+%R"']
})

const dateModule = Widget.Label ({
	label: clockBar.bind(),
})

const rightBar = Widget.Box ({
	hpack: "end", 
	spacing: 8,
	children: [
		mediaModule,
		trayModule,
		systemModule,
		dateModule,
	],
})

const bar = Widget.Window ({
	name: 'bar',
	anchor: ["top", "left", "right"],
	child: Widget.CenterBox ({
		className: "bar",
		startWidget: leftBar,
		endWidget: rightBar,
	}),
})

App.config ({
	windows: [bar]
})
