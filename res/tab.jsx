
/** @jsx React.DOM */

var App = React.createClass({
	getInitialState: function() {
		return {
			itemsQuantity: 10
		};
	},

	handleChange: function(event) {
		this.setState({
			itemsQuantity: Math.max(parseInt(event.target.value), 1)
		});
	},

	render: function() {
		var generateItems = function(parentName) {
			var items = {};
			var itemName;
			var key;
			for(var i=1; i<this.state.itemsQuantity + 1; i++) {
				itemName = "Child of " + parentName + " #" + i;
				key = ["k" + i];
				items[key] = <Item key={key} name={itemName}/>;
			}
			return items;
		}.bind(this);

		return (
			<div>
				<strong>Items Quantity: </strong><input type="number" value={this.state.itemsQuantity} onChange={this.handleChange}/>
				<hr/>
				<Group>
					<Tab key="A" name="Tab A">{generateItems("A")}</Tab>
					<Tab key="B" name="Tab B">{generateItems("B")}</Tab>
					<Tab key="C" name="Tab C">{generateItems("C")}</Tab>
				</Group>
			</div>
		);
	}
});

var Group = React.createClass({
	getInitialState: function() {
		return {
			selectedTab: this.props.children[0]
		};
	},

	selectTab: function(tab) {
		this.setState({
			selectedTab: tab
		});
	},

	render: function() {
		var selectedTab = this.state.selectedTab;
		var newSelectedTab;
		var selectedTabName = "None";
		var tabs = [];
		var tabItems = [];
		var selectedKey = (this.state.selectedTab && this.state.selectedTab.props.key);
		var isSelected;

		tabs = React.Children.map(this.props.children, function(tab, i) {
			isSelected = tab.props.key === selectedKey;
			if (isSelected) {
				newSelectedTab = tab;
			}
			return React.addons.cloneWithProps(tab, {
				isSelected: isSelected,
				selectTab: this.selectTab,
				key: tab.props.key
			});
		}, this);

		tabItems = (newSelectedTab && newSelectedTab.props.children) || [];

		return (
			<div>
				<div className="tabs-row">{tabs}</div>
				<div className="tab-content">{tabItems}</div>
			</div>
		);
	}

});

var Tab = React.createClass({
	handleClick: function() {
		this.props.selectTab(this);
	},

	render: function() {
		var selected = this.props.isSelected;
		return (
			<span
				onClick={this.handleClick}
				className={(selected ? "selected" : "") + " tab"}
			>
				{this.props.name} (key: {this.props.key})
			</span>
		);
	}

});

var Item = React.createClass({

	render: function() {
		return (
			<div>{this.props.name} (key: {this.props.key})</div>
		);
	}
});

React.renderComponent(<App />, document.body);

#-------------------------------------------------- BEGIN [css] - (02-12-2017 - 10:31:47) {{

// Do not delete or move this file.
// Many fiddles reference it so we have to keep it here.
(function() {
  var tag = document.querySelector(
    'script[type="application/javascript;version=1.7"]'
  );
  if (!tag || tag.textContent.indexOf('window.onload=function(){') !== -1) {
    alert('Bad JSFiddle configuration, please fork the original React JSFiddle');
  }
  tag.setAttribute('type', 'text/jsx;harmony=true');
  tag.textContent = tag.textContent.replace(/^\/\/<!\[CDATA\[/, '');
})();
span.tab {
	margin-right: 10px;
	padding: 5px;
}

span.selected {
	color: red;
	text-decoration: underline;
	background-color: #DDDDDD;
}

div.tabs-row {
	margin-bottom: 5px;
}

div.tab-content {
	padding: 10px;
	background-color: #DDDDDD;
}
#-------------------------------------------------- END   [css] - (02-12-2017 - 10:31:47) }}
