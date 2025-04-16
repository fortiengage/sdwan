# Topology

### Underlay
This diagram provides the physical ports used by the topologies, as well as some key IP addresses and networks.
![Dual hub branch underlay](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_Underlay_74.png) 

### IPsec Overlay
This is the first step of the overlay to indicate the various IPSec VPN tunnels that are established over the underlay. The diagram associates the tunnel paths with the naming convention.
![Dual hub branch overlay IPsec](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_IPSec_74.png) 

### BGP Overlay
This topology builds on the IPSec overlay topology to indicate how BGP settings on the hub and branch devices are selected.
![Dual hub branch overlay BGP](https://github.com/fortinet/4D-Demo/blob/main/4D-SDWAN/7.4/Dual%20hub/DH_SD_bgp_74.png) 
