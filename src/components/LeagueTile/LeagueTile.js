import React, { Component, Fragment } from "react";
import _find from "lodash/find";
import { Mutation } from "react-apollo";
import ReactMomentCountDown from "react-moment-countdown";
import moment from "moment";

import { history } from "../../App";

// Material
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

// GraphQL
import { USER_QUERY } from "../../graphql/queries";
import {
  CANCEL_LEAGUE_INVITATION_MUTATION,
  READY_TO_DRAFT_MUTATION
} from "../../graphql/mutations";

import "./LeagueTile.scss";

class LeagueTile extends Component {
  state = {
    expanded: false,
    isSettingsOpen: false
  };

  render = () => {
    const { league } = this.props;

    if (!league) {
      return null;
    }

    const isInvitationPending = league.user_list.length === 1;
    const hasActiveMatch = !!_find(league.matches, {
      week: this.props.currentWeek
    });

    let content = null;
    let expandedContent = null;
    let subheader = league.opponent;
    if (isInvitationPending) {
      content = <InvitationPendingContent league={league} />;
      subheader = "Invitation Pending";
    } else if (hasActiveMatch) {
      content = <ActiveMatchSummary league={league} />;
      expandedContent = <ExpandedContent league={league} />;
    } else if (this.props.isFetchingSeasonDetails) {
      content = <CircularProgress />;
    } else if (!hasActiveMatch && this.props.isDraftDay) {
      content = <DraftDayContent league={league} />;
    } else if (!hasActiveMatch && !this.props.isDraftDay) {
      content = (
        <DraftCountdownContent
          nextDraftDay={this.props.nextDraftDay}
          refetch={this.props.refetch}
        />
      );
      content = <DraftDayContent league={league} />;
    }

    return (
      <Card className="league-tile" key={`league-tile-${league.id}`}>
        <CardHeader
          // avatar={
          //   <Avatar aria-label="recipe" className={classes.avatar}>
          //     R
          //   </Avatar>
          // }
          action={
            <Fragment>
              <IconButton
                aria-label="settings"
                aria-haspopup="true"
                ref={ref => (this.settingsMenuRef = ref)}
                onClick={this.openSettingsMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Mutation
                mutation={CANCEL_LEAGUE_INVITATION_MUTATION}
                refetchQueries={() => [{ query: USER_QUERY }]}
              >
                {mutate => (
                  <Menu
                    id="simple-menu"
                    anchorEl={this.settingsMenuRef}
                    keepMounted
                    open={this.state.isSettingsOpen}
                    onClose={this.closeSettingsMenu}
                  >
                    <MenuItem
                      onClick={async () => {
                        mutate({ variables: { leagueId: `${league.id}` } });
                        this.closeSettingsMenu();
                      }}
                    >
                      <DeleteOutlineIcon />
                      &nbsp; Delete League
                    </MenuItem>
                    {
                      // <MenuItem onClick={this.closeSettingsMenu}>My account</MenuItem>
                      // <MenuItem onClick={this.closeSettingsMenu}>Logout</MenuItem>
                    }
                  </Menu>
                )}
              </Mutation>
            </Fragment>
          }
          title={league.league_name}
          subheader={subheader}
        />
        <CardContent>{content}</CardContent>
        <CardActions disableSpacing>
          {
            // <IconButton aria-label="add to favorites">
            //   <FavoriteIcon />
            // </IconButton>
            // <IconButton aria-label="share">
            //   <ShareIcon />
            // </IconButton>
          }
          {expandedContent && (
            <IconButton
              className={`league-tile expand${
                this.state.expanded ? " expandOpen" : ""
              }`}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </CardActions>
        {expandedContent && (
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            {expandedContent}
          </Collapse>
        )}
      </Card>
    );
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  openSettingsMenu = () => {
    this.setState({ isSettingsOpen: true });
  };

  closeSettingsMenu = () => {
    this.setState({ isSettingsOpen: false });
  };
}

export const ActiveMatchSummary = ({ league }) => {
  return "Here is your active match summary!";
};

export const ExpandedContent = ({ league }) => {
  return (
    <CardContent>
      <Typography paragraph>Method:</Typography>
      <Typography paragraph>
        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
        aside for 10 minutes.
      </Typography>
      <Typography paragraph>
        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
        large plate and set aside, leaving chicken and chorizo in the pan. Add
        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and
        cook, stirring often until thickened and fragrant, about 10 minutes. Add
        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
      </Typography>
      <Typography paragraph>
        Add rice and stir very gently to distribute. Top with artichokes and
        peppers, and cook without stirring, until most of the liquid is
        absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
        shrimp and mussels, tucking them down into the rice, and cook again
        without stirring, until mussels have opened and rice is just tender, 5
        to 7 minutes more. (Discard any mussels that don’t open.)
      </Typography>
      <Typography>
        Set aside off of the heat to let rest for 10 minutes, and then serve.
      </Typography>
    </CardContent>
  );
};

export const DraftCountdownContent = ({ nextDraftDay, refetch }) => {
  const toDate = moment.unix(nextDraftDay);
  return (
    <div className="league-tile-center-content">
      <div className="countdown-numbers">
        <ReactMomentCountDown
          toDate={toDate}
          targetFormatMask="DD:HH:mm:ss"
          onCountdownEnd={refetch}
        />
      </div>
      <div className="countdown-label-container">
        <div className="countdown-label">D</div>
        <div className="countdown-label">H</div>
        <div className="countdown-label">M</div>
        <div className="countdown-label">S</div>
      </div>
      <div className="countdown-text">Until Draft Day</div>
    </div>
  );
};

export const DraftDayContent = ({ league }) => {
  return (
    <div className="league-tile-center-content">
      <Typography variant="body2" color="textSecondary" component="p">
        {
          // <div>It's draft day! Get it.</div>
        }
        <Mutation mutation={READY_TO_DRAFT_MUTATION}>
          {mutate => (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={async () => {
                await mutate({ variables: { leagueId: Number(league.id) } });
                history.push(`/draft/${league.id}`);
              }}
              // className={classes.button}
              // startIcon={<CloudUploadIcon />}
            >
              Draft Now!
            </Button>
          )}
        </Mutation>
      </Typography>
    </div>
  );
};

export const InvitationPendingContent = ({ league }) => {
  return (
    <Mutation
      mutation={CANCEL_LEAGUE_INVITATION_MUTATION}
      refetchQueries={() => [{ query: USER_QUERY }]}
    >
      {mutate => (
        <Fragment>
          <div className="league-tile-center-content translucent">
            Invitation sent to <strong>{league.opponent}</strong>
          </div>
          <br />
          {
            // <button className="draftwars-btn">Edit Settings</button>
          }
        </Fragment>
      )}
    </Mutation>
  );
};

// export const DeleteLeagueConfirm = () => {
//   return <ConfirmationDialog />;
// };

export default LeagueTile;
