# Multi-Datacenter (Primary/Secondary) Enterprise SD-WAN

[commentqqqqq]: #

### Topology

### Underlay
This diagram provides the physical ports used by the topologies, as well as some key IP addresses and networks.
![Dual hub branch underlay](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/Dual%20hub/DH_SD_underlay.png?raw=true) 

### IPsec Overlay
This is the first step of the overlay to indicate the various IPSec VPN tunnels that are established over the underlay. The diagram associates the tunnel paths with the naming convention.
![Dual hub branch overlay IPsec](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/Dual%20hub/DH_SD_overlay_ipsec.png?raw=true) 

### BGP Overlay
This topology builds on the IPSec overlay topology to indicate how BGP settings on the hub and branch devices are selected.
![Dual hub branch overlay BGP](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/Dual%20hub/DH_SD_overlay_bgp.png?raw=true) 
