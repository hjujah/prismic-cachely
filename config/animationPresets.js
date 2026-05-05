export default {
	fade: [
		{
			opacity: 0
		},
		{
			opacity: 1,
			duration: 0.5,
			ease: "linear"
		}
	],
	fadeUp: [
		{
			opacity: 0,
			y: "4rem"
		},
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "Power2.easeOut",
			clearProps: "transform"
		}
	],
	fadeLeft: [
		{
			opacity: 0,
			x: 120
		},
		{
			opacity: 1,
			x: 0,
			duration: 1.2,
			ease: "Power2.easeOut",
			clearProps: "transform"
		}
	],
	fadeRight: [
		{
			opacity: 0,
			x: -120
		},
		{
			opacity: 1,
			x: 0,
			duration: 1.2,
			ease: "Power2.easeOut",
			clearProps: "transform"
		}
	],
	y: [
		{
			y: 120
		},
		{
			y: 0,
			duration: 1.2,
			ease: "Power2.easeOut",
			clearProps: "transform"
		}
	],
	x: [
		{
			x: 120
		},
		{
			x: 0,
			duration: 1.2,
			ease: "Power2.easeOut",
			clearProps: "transform"
		}
	],

	scaleUp: [
		{
			opacity: 0,
			scale: 0.85
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.8
		}
	]
}
