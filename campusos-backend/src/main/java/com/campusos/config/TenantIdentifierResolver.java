package com.campusos.config;

import com.campusos.security.TenantContext;
import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver<String> {

    @Override
    public String resolveCurrentTenantIdentifier() {
        String tenantId = TenantContext.getCurrentTenant();
        if (tenantId != null) {
            return tenantId;
        }
        // Default tenant or bootstrap tenant when none is set
        return "PUBLIC";
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return true;
    }
}
