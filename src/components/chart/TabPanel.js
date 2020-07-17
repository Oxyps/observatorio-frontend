import React from 'react';

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function TabPanel({ children, tabKey, tabIndex, ...other }) {
	return (
	  <div
		role="tabpanel"
		hidden={tabKey !== tabIndex}
		id={`scrollable-force-tabpanel-${tabIndex}`}
		aria-labelledby={`scrollable-force-tab-${tabIndex}`}
		{...other}
	  >
		{tabKey === tabIndex && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }
