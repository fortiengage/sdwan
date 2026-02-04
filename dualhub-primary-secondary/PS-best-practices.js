{#
  This script includes all the best practices from the PS team when they deploy SD-WAN projects for customers. 
  IPsec
  BGP
  SD-WAN
#}

{# IPsec 
    [number of hubs] x [number of underlays] = number of phase1-interface/phase2-interface
    The naming convention is "HUBx-VPNx". 
    The following is the example.
#}

config vpn ipsec phase1-interface
  edit "HUB1-VPN1"
    dpd-retrycount 3
    dpd-retryinterval 3
    exchange-fgt-device-id enable
    dhgrp 14 20 21
{# Branch only options #}
    {% if device.hub_branch == "Branch" %}
      auto-discovery-shortcuts dependent
      idle-timeoutinterval 5
      keylife 14400
    {% endif %}
{# Hub only options #}
    {% if device.hub_branch == "Hub" %}
      keylife 28800
    {% endif %}
  next
end

config vpn ipsec phase2-interface
  edit "HUB1-VPN1"
    dhgrp 14
    replay disable
{# Branch only options #}
    {% if device.hub_branch == "Branch" %}
      keylifeseconds 7200
    {% endif %}
{# Hub only options #}
    {% if device.hub_branch == "Hub" %}
      keylifeseconds 14400
      keepalive enable
    {% endif %}
  next
end

config router bgp
  set keepalive-timer 10
  holdtime-timer 30
{# Hub only options #}
  {% if device.hub_branch == "Hub" %}
    config aggregate-address
      edit 1
        set prefix 172.16.1.0 255.255.255.0 // 172.16.1.0 is from overlay template
        set summary-only enable
      next
    end
  {% endif %}
{# Branch only options #}
    {% if device.hub_branch == "Branch" %}
      config neighbor
        edit "172.16.1.253"  // hub's loopback IP, if two hubs, one hub, check the number
          capability-dynamic enable
          advertisement-interval 2
          next-hop-self enable
          connect-timer 2
          route-map-in RTMAP_IN_HUB<N> // need update
          route-map-out RTMAP_OUT
          unset route-map-out-preferable
        next
        edit "172.16.1.254"  // hub's loopback IP, if two hubs, one hub, check the number
          capability-dynamic enable
          advertisement-interval 2
          next-hop-self enable
          connect-timer 2
          route-map-in RTMAP_IN_HUB<N> // need update
          route-map-out RTMAP_OUT
          unset route-map-out-preferable
        next
      end
      config neighbor-group
          edit "BRANCHES-DYNAMIC-iBGP"
              capability-graceful-restart enable // need Olesya to confirm
              capability-dynamic enable
              advertisement-interval 2
              connect-timer 2
              route-map-in RTMAP_IN_DYN_BGP
              route-map-out RTMAP_OUT
              unset prefix-list-out
        next
      end
    {% endif %}
{# Hub only options #}
    {% if device.hub_branch == "Hub" %}
      config neighbor-group
        edit "BRANCHES"
          capability-dynamic enable
          advertisement-interval 2
          connect-timer 2
          route-map-in RTMAP_IN_ALL_OVERLAYS
          route-map-out RTMAP_OUT_ALL_OVERLAYS
        next
      end
    {% endif %}
