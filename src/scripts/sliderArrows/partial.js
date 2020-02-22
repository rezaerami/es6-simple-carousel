import {
	setTranslate3d,
	calcFinalItemPosition,
	nextNone,
	prevBlock,
	nextBlock,
	prevNone,
	calcFirstItemPosition
} from '../utils';

export const shiftSlideIsDir = params => {
	let {
		sliderItems,
		index,
		perSlide,
		slideSize,
		slidesLength,
		sliderMainWidth,
		responsiveItem,
		infinite,
		slider,
		posInitial
	} = params;
	const newSlidesLength = infinite ? slidesLength : slidesLength - 1;

	const calcFinalItemPositionParams = {
		slideSize,
		slidesLength,
		sliderMainWidth,
		perSlide,
		infinite
	};
	const newIndex = index + perSlide;

	if (!infinite && newIndex >= newSlidesLength && responsiveItem !== 1) {
		sliderItems.style["transform"] = setTranslate3d(
			calcFinalItemPosition(calcFinalItemPositionParams)
		);
		nextNone(slider);
		prevBlock(slider);

		return newIndex;
	}

	if (!infinite && newIndex * perSlide >= slidesLength) {
		sliderItems.style["transform"] = setTranslate3d(
			calcFinalItemPosition(calcFinalItemPositionParams)
		);
		nextNone(slider);
		prevBlock(slider);
	}
	if (!infinite && newIndex === newSlidesLength) {
		nextNone(slider);
		prevBlock(slider);
	}

	// if (infinite && newIndex >= perSlide + slidesLength) {
	// 	// shift after finish items
	// 	const shiftEndToFirstParams = {
	// 		sliderItems,
	// 		slideSize,
	// 		perSlide,
	// 		newIndex,
	// 		slidesLength
	// 	};
	// 	return shiftEndToFirst(shiftEndToFirstParams);
	// }

	sliderItems.style["transform"] = setTranslate3d(-newIndex * slideSize);
	return newIndex;
};

export const shiftSlideNonDir = params => {
	let {
		sliderItems,
		slideSize,
		index,
		perSlide,
		infinite,
		slider,
		slidesLength
	} = params;
	const newIndex = index - perSlide;
	const infinitperSlide = infinite ? perSlide : 0;

	if (!infinite && index - infinitperSlide <= perSlide && index !== -1) {
		const calcFirstItemPositionParams = { slideSize, perSlide, infinite };
		sliderItems.style["transform"] = setTranslate3d(
			calcFirstItemPosition(calcFirstItemPositionParams)
		);
		nextBlock(slider);
		prevNone(slider);
		return newIndex;
	}

	sliderItems.style["transform"] = setTranslate3d(-newIndex * slideSize);
	return newIndex;
};

export const shiftFirstToEnd = params => {
	const { sliderItems, slidesLength, slideSize, newIndex } = params;
	sliderItems.style["transform"] = setTranslate3d(
		-((slidesLength + newIndex) * slideSize)
	);
	return slidesLength + newIndex;
};

export const shiftEndToFirst = params => {
	const { sliderItems, slideSize, newIndex, slidesLength } = params;
	sliderItems.style["transform"] = setTranslate3d(
		-(newIndex - slidesLength) * slideSize
	);
	return newIndex - slidesLength;
};