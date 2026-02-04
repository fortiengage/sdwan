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
