import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
describe('<NavigationItems/>', () => {
  it('should render 2 <NavigationItems/> elements if not authenticated', (done) => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
    done();
  });
  it('should render 3 <NavigationItems/> elements if authenticated', (done) => {
    const wrapper = shallow(<NavigationItems auth/>);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
    done();
  });
});
