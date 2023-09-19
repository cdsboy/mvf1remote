import { gql } from "@apollo/client";

export const EVERYTHING_QUERY = gql`
  query Query {
    activeSubscriptions {
      subscriptionType
      expiresAt
      signature
    }
    liveTimingClock {
      paused
      systemTime
      trackTime
      liveTimingStartTime
    }
    liveTimingState {
      ArchiveStatus
      AudioStreams
      CarData
      ChampionshipPrediction
      ContentStreams
      DriverList
      ExtrapolatedClock
      Heartbeat
      LapCount
      LapSeries
      PitLaneTimeCollection
      Position
      RaceControlMessages
      SessionData
      SessionInfo
      SessionStatus
      TeamRadio
      TimingAppData
      TimingData
      TimingStats
      TopThree
      TrackStatus
      WeatherData
      WeatherDataSeries
    }
    players {
      id
      type
      state {
        ts
        paused
        muted
        volume
        live
        currentTime
        interpolatedCurrentTime
      }
      driverData {
        driverNumber
        tla
        firstName
        lastName
        teamName
      }
      streamData {
        contentId
        meetingKey
        sessionKey
        channelId
        title
      }
      fullscreen
      alwaysOnTop
      maintainAspectRatio
      bounds {
        x
        y
        width
        height
      }
    }
  }
`;

export const CREATE_PLAYER = gql`
  mutation PlayerCreate($input: PlayerCreateInput!) {
    playerCreate(input: $input)
  }
`;

export const SYNC_PLAYER = gql`
  mutation PlayerSync($playerSyncId: ID!) {
    playerSync(id: $playerSyncId)
  }
`;

export const PAUSE_PLAYER = gql`
  mutation PlayerSetPaused($playerSetPausedId: ID!, $paused: Boolean) {
    playerSetPaused(id: $playerSetPausedId, paused: $paused)
  }
`;

export const SET_PLAYER_FULLSCREEN = gql`
  mutation PlayerSetFullscreen(
    $playerSetFullscreenId: ID!
    $fullscreen: Boolean
  ) {
    playerSetFullscreen(id: $playerSetFullscreenId, fullscreen: $fullscreen)
  }
`;

export const SET_PLAYER_MUTED = gql`
  mutation PlayerSetMuted($playerSetMutedId: ID!, $muted: Boolean) {
    playerSetMuted(id: $playerSetMutedId, muted: $muted)
  }
`;

export const DELETE_PLAYER = gql`
  mutation PlayerDelete($playerDeleteId: ID!) {
    playerDelete(id: $playerDeleteId)
  }
`;

export const SET_PLAYER_BOUNDS = gql`
  mutation PlayerSetBounds($playerSetBoundsId: ID!, $bounds: RectangleInput!) {
    playerSetBounds(id: $playerSetBoundsId, bounds: $bounds) {
      x
      y
      width
      height
    }
  }
`;

export const PLAYER_SEEK_TO = gql`
  mutation PlayerSeekTo($playerSeekToId: ID!, $relative: Float) {
    playerSeekTo(id: $playerSeekToId, relative: $relative)
  }
`;

export const SET_PLAYER_ALWAYS_ON_TOP = gql`
  mutation PlayerSetAlwaysOnTop(
    $playerSetAlwaysOnTopId: ID!
    $alwaysOnTop: Boolean
  ) {
    playerSetAlwaysOnTop(id: $playerSetAlwaysOnTopId, alwaysOnTop: $alwaysOnTop)
  }
`;
