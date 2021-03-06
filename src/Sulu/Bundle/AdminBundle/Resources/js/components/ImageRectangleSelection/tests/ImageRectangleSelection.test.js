/* eslint-disable flowtype/require-valid-file-annotation */
import {ImageRectangleSelection} from '../ImageRectangleSelection';
import React from 'react';
import {mount} from 'enzyme';

jest.mock('../../withContainerSize/withContainerSize');

class MockedImageSelection extends ImageRectangleSelection {
    componentDidMount() {
        Promise.resolve().then(this.props.mountSpy);
    }

    componentWillMount() {
        this.image = {naturalWidth: 1920, naturalHeight: 1080};
        this.imageLoaded = true;
    }
}

test('The component should render with image source', () => {
    const view = mount(<MockedImageSelection containerWidth={640} containerHeight={360} src="//:0" />);
    expect(view.render()).toMatchSnapshot();
});

test('The component should calculate the selection with respect to the image', (done) => {
    window.requestAnimationFrame = jest.fn((cb) => cb());

    const onChangeSpy = (data) => {
        expect(data).toEqual({width: 1920, height: 1080, top: 0, left: 0});
        done();
    };

    mount(
        <MockedImageSelection
            containerWidth={640}
            containerHeight={360}
            onChange={onChangeSpy}
            src="//:0" />
    );
});

test('The component should render with initial selection', (done) => {
    window.requestAnimationFrame = jest.fn((cb) => cb());

    const spy = () => {
        expect(view.render()).toMatchSnapshot();
        done();
    };
    const onChangeSpy = (data) => {
        expect(data).toEqual({ width: 1500, height: 800, top: 200, left: 300 });
    };

    const view = mount(
        <MockedImageSelection
            onChange={onChangeSpy}
            mountSpy={spy}
            src="//:0"
            containerWidth={640}
            containerHeight={360}
            initialSelection={{width: 1500, height: 800, top: 200, left: 300}} />
    );
});

test('The component should render with minWidth and minHeight', (done) => {
    window.requestAnimationFrame = jest.fn((cb) => cb());

    const spy = () => {
        const rectangle = view.find('RectangleSelection');
        expect(rectangle.length).toBe(1);
        expect(rectangle.props().minWidth).toBe(200);
        expect(rectangle.props().minHeight).toBe(100);
        done();
    };

    const view = mount(
        <MockedImageSelection
            mountSpy={spy}
            src="//:0"
            containerWidth={640}
            containerHeight={360}
            minHeight={300}
            minWidth={600} />
    );
});
