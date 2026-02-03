{# Adopted PS team's security hardening, spec 40572 #}
{# 
    CIS benchmark, CIS references 2.1.3, ensure timezone is properly configured.
    Implemented in the pre-run script by using the collected timezone per device.
#}
{# Recommendation by PS: Ensure auto firmware upgrade is disabled #}
config system fortiguard
    set auto-firmware-upgrade disable
end
{# Recommendation by PS: disable FortiExplorer #}
config system console
    set FortiExplorer disable
end

{# Adopted AS/FortiConan team's security hardening, spec 39652 #}
 
{# enforce admin password policy #}
config system password-policy
    set status enable
    set min-lower-case-letter 1
    set min-upper-case-letter 1
    set min-non-alphanumeric 1
    set min-number 1
    set reuse-password disable
end

{# Administrator disclaimers #}
config system global
    set pre-login-banner enable
    set post-login-banner enable
end

{# Default admin account #}
{# Add one suggestion in the deployment report to rename the admin name #}
{# In report, suggestion for next step: Rename the default admin name to other name #}
config system admin
    #rename admin to othername
end

{# Default management ports #}
{# In report, suggestion for next step #}
config system global
    set admin-sport 10443
    set admin-ssh-port 1022
end

{# Failed login attempts, change it to recommended admin lockout duration #}
config system global
    set admin-lockout-duration 1800
end

{# Severity High: IPsec ciphers #}
{# for all the phase1-interface  and phase2-interface #} 
{# skip for now, do it in Olesya's excel, post-run
{% if hub_branch == "Branch" %}
config vpn ipsec phase1-interface
    edit "HUB1-VPN1"
        unselect dhgrp 5
    next
    edit "HUB1-VPN2"
        unselect dhgrp 5
    next
    edit "HUB2-VPN1"
        unselect dhgrp 5
    next
    edit "HUB2-VPN2"
        unselect dhgrp 5
    next
end
config vpn ipsec phase2-interface
    edit "HUB1-VPN1"
        unselect dhgrp 5
    next
    edit "HUB1-VPN2"
        unselect dhgrp 5
    next
    edit "HUB2-VPN1"
        unselect dhgrp 5
    next
    edit "HUB2-VPN2"
        unselect dhgrp 5
    next
end
{% endif %}
{% if hub_branch == "Hub" %}
config vpn ipsec phase1-interface
    edit "VPN1"
        unselect dhgrp 5
    next
    edit "VPN2"
        unselect dhgrp 5
    next
end
config vpn ipsec phase2-interface
    edit "VPN1"
        unselect dhgrp 5
    next
    edit "VPN2"
        unselect dhgrp 5
    next
end
{% endif %}
#}

{# Severity High: Private encryption key #}
config system global
    set private-data-encryption enable
end

{# SSH grace time #}
config system global
    set admin-ssh-grace-time 30
end

{# Strong cryptography #}
config system global
    set ssl-static-key-ciphers disable
    set dh-params 8192
end

{# Medium: Trusted hosts #}
{# add to next step: suggest configuring a trusted host for the administrator "admin" if it needs to prevent administrative login attempts from untrusted networks.} 
 #}
{#
config system admin
    edit "admin"
        set trusthost1 127.0.0.1/32
    next
end
#}

{# Two-factor authentication #}
{# add to next step, suggest adding two-factor authentication for all admin users #}
config system admin
    edit "admin"
        set two-factor enable
    next
end

{# USB auto configuration #}
config system auto-install
    set auto-install-config disable
    set auto-install-image disable
end

//////////////////////////////////////////
For all unused interfaces, set status=down. 
{# Unused interfaces #}
{# add to next step, for  #}
{#
config system interface
    edit "ha"        
        set status down
    next
end
#}

